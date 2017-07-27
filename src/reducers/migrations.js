import { sensorsByType } from '../lib/constants';

const migrations = [
  network => network, // Need this for seeding
  network => ({
    ...network,
    nodes: network.nodes.map(node => ({
      ...node,
      board: (node.type === 'gateway' && node.gatewayType === 'esp8266') ? 'd1_mini' : 'pro8MHzatmega328',
      sensors: node.sensors.map(sensor => {
        if(sensorsByType[sensor.type].pinType !== 'analog') return sensor;

        return {
          ...sensor,
          reportInterval: sensor.reportInterval || 10,
          reportIntervalUnit: sensor.reportIntervalUnit || 'minutes'
        };
      })
    }))
  })
];

export const migrate = network => {
  const migrationsToApply = migrations.slice(network.version || 0);

  if(migrationsToApply.length) console.log(`Migrating network ${network.id}...`);

  return {
    ...migrationsToApply.reduce((network, migrate) => migrate(network), network),
    version: migrations.length
  }
}

export const migrateReducer = (state, action) => {
  if(action.type !== 'MIGRATE') return state;

  return {
    ...state,
    networks: state.networks.map(migrate)
  }
}
