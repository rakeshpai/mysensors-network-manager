import { gatewayConfiguration } from '../generate-config-h';

const match = expect.stringMatching;

it('doesn\'t enable gateway when not needed', () => {
  expect(
    gatewayConfiguration({}, {})
  ).toEqual('');
});

it('sets gateway serial', () => {
  expect(
    gatewayConfiguration({}, {type: 'gateway', gatewayType: 'serial'})
  ).toEqual(match(/\n#define MY_GATEWAY_SERIAL/));
});

it('sets gateway ethernet', () => {
  expect(
    gatewayConfiguration(
      {},
      {
        type: 'gateway',
        gatewayType: 'ethernet',
        dhcp: true,
        ethernet: { module: 'enc28j60' },
        conn: {}
      }
    )
  ).toEqual(match(/\n#define MY_GATEWAY_ENC28J60/));

  expect(
    gatewayConfiguration(
      {},
      {
        type: 'gateway',
        gatewayType: 'ethernet',
        dhcp: true,
        ethernet: { module: 'w5100' },
        conn: {}
      }
    )
  ).toEqual(match(/\n#define MY_GATEWAY_W5100/));
});

it('sets esp8266 settings', () => {
  const output = gatewayConfiguration(
    {},
    {
      type: 'gateway',
      gatewayType: 'esp8266',
      dhcp: true,
      wifi: { ssid: 'dlink', password: 'admin' },
      conn: {}
    }
  )

  expect(output).toEqual(match(/\n#define MY_GATEWAY_ESP8266/));
  expect(output).toEqual(match(/\n#define MY_ESP8266_SSID "dlink"/));
  expect(output).toEqual(match(/\n#define MY_ESP8266_PASSWORD "admin"/));
});

it('doesn\'t set esp8266 password if not specified', () => {
  expect(
    gatewayConfiguration(
      {},
      {
        type: 'gateway',
        gatewayType: 'esp8266',
        dhcp: true,
        wifi: { ssid: 'dlink' },
        conn: {}
      }
    )
  ).toEqual(match(/\n\/\/#define MY_ESP8266_PASSWORD ""/));
});

it('does manual IP configuration', () => {
  const output = gatewayConfiguration(
    {},
    {
      type: 'gateway',
      gatewayType: 'ethernet',
      dhcp: false,
      ethernet: { module: 'w5100', ip: '1.1.1.1', gateway: '2.2.2.2', subnet: '3.3.3.3' },
      conn: {}
    }
  );

  expect(output).toEqual(match(/\n#define MY_IP_ADDRESS 1,1,1,1/));
  expect(output).toEqual(match(/\n#define MY_IP_GATEWAY_ADDRESS 2,2,2,2/));
  expect(output).toEqual(match(/\n#define MY_IP_SUBNET_ADDRESS 3,3,3,3/));
});

it('sets up server mode', () => {
  const output = gatewayConfiguration(
    {},
    {
      type: 'gateway',
      gatewayType: 'ethernet',
      dhcp: true,
      ethernet: { module: 'w5100' },
      conn: { type: 'server', serverMaxClients: 1, serverPort: 1234 }
    }
  );

  expect(output).toEqual(match(/\n#define MY_GATEWAY_MAX_CLIENTS 1/));
  expect(output).toEqual(match(/\n#define MY_PORT 1234/));
});

it('sets up client mode', () => {
  const output = gatewayConfiguration(
    {},
    {
      type: 'gateway',
      gatewayType: 'ethernet',
      dhcp: true,
      ethernet: { module: 'w5100' },
      conn: { type: 'client', controllerIp: '1.1.1.1', controllerPort: 1234 }
    }
  );

  expect(output).toEqual(match(/\n#define MY_CONTROLLER_IP_ADDRESS 1,1,1,1/));
  expect(output).toEqual(match(/\n#define MY_PORT 1234/));
});

it('sets up client mode with controller hostname');

it('sets up mqtt mode', () => {
  const output = gatewayConfiguration(
    {},
    {
      type: 'gateway',
      gatewayType: 'ethernet',
      dhcp: true,
      ethernet: { module: 'w5100' },
      conn: { type: 'mqtt', mqttHost: '1.1.1.1', mqttPort: 1234 }
    }
  );

  expect(output).toEqual(match(/\n#define MY_GATEWAY_MQTT_CLIENT/));
  expect(output).toEqual(match(/\n#define MY_CONTROLLER_IP_ADDRESS 1,1,1,1/));
  expect(output).toEqual(match(/\n#define MY_PORT 1234/));
});

it('sets up mqtt with broker hostname');
it('sets up mqtt auth');
