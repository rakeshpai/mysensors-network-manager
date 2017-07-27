const migrations = [
  network => network, // Need this for seeding
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
