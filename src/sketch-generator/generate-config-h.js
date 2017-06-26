export const sketchConfiguration = (network, node) => `
/**********************************
 * Sketch configuration
 */

#define SKETCH_NAME "${node.name}"
#define SKETCH_VERSION "1.0"
${!node.battery.powered ? '#define MY_REPEATER_FEATURE' : ''}
`;

export const radioConfiguration = (network, node) => {
  if(network.radio === 'NRF24L01+') {
    return `
// NRF24 radio settings
#define MY_RADIO_NRF24
#define MY_RF24_ENABLE_ENCRYPTION
#define MY_RF24_CHANNEL ${network.nrfChannel}
#define MY_RF24_PA_LEVEL RF24_PA_${node.pa && !node.battery.powered ? 'HIGH' : 'LOW'}
//#define MY_DEBUG_VERBOSE_RF24
`
  } else {
    return `
// RFM69 radio settings
#define MY_RADIO_RFM69
#define MY_RFM69_FREQUENCY RF69_${network.rfmFrequency}MHZ
${node.hw ? '' : '//'}#define MY_IS_RFM69HW
#define MY_RFM69_NEW_DRIVER
#define MY_RFM69_ENABLE_ENCRYPTION
#define MY_RF69_IRQ_PIN D1
#define MY_RF69_IRQ_NUM MY_RF69_IRQ_PIN
#define MY_RF69_SPI_CS D2
//#define MY_DEBUG_VERBOSE_RFM69
`
  }
}

export const nodeConfiguration = (network, node) => `
/**********************************
 * MySensors node configuration
 */

// General settings
#define MY_BAUD_RATE 9600
//#define MY_DEBUG
`;

export const gatewayConfiguration = (network, node) => {
  if(node.type !== 'gateway') return '';

  if(node.gatewayType === 'serial') {
    return `
// Serial gateway settings
#define MY_GATEWAY_SERIAL
`;
  }

  let gatewayType;

  if(node.gatewayType === 'ethernet') {
    gatewayType = `
// Ethernet gateway settings
#define MY_GATEWAY_${node.ethernet.module === 'w5100' ? 'W5100' : 'ENC28J60'}
`;
  } else if(node.gatewayType === 'esp8266') {
    gatewayType = `
// ESP8266 gateway settings
#define MY_GATEWAY_ESP8266
#define MY_ESP8266_SSID "${node.wifi.ssid}"
${node.wifi.password ? '' : '//'}#define MY_ESP8266_PASSWORD "${node.wifi.password || ''}"
`;
  }

  const ipSettings = node.ethernet.dhcp ? '' : `
// Gateway networking settings
#define MY_IP_ADDRESS ${node.ethernet.ip.split('.').join(',')}
#define MY_IP_GATEWAY_ADDRESS ${node.ethernet.gateway.split('.').join(',')}
#define MY_IP_SUBNET_ADDRESS ${node.ethernet.subnet.split('.').join(',')}
`;

  let connType;

  if(node.conn.type === 'server') {
    connType = `
#define MY_GATEWAY_MAX_CLIENTS ${node.conn.serverMaxClients}
#define MY_PORT ${node.conn.serverPort}
`;
  } else if(node.conn.type === 'client') {
    connType = `
// Controller ip address. Enables client mode (default is "server" mode).
// Also enable this if MY_USE_UDP is used and you want sensor data sent somewhere.
#define MY_CONTROLLER_IP_ADDRESS ${node.conn.controllerIp.split('.').join(',')}
//#define MY_CONTROLLER_URL_ADDRESS "m20.cloudmqtt.com"
#define MY_PORT ${node.conn.controllerPort}
//#define MY_USE_UDP
`;
  } else if(node.conn.type === 'mqtt') {
    connType = `
// Gateway MQTT settings
#define MY_GATEWAY_MQTT_CLIENT
//#define MY_CONTROLLER_URL_ADDRESS "m20.cloudmqtt.com"
#define MY_CONTROLLER_IP_ADDRESS ${node.conn.mqttHost.split('.').join(',')}
#define MY_PORT ${node.conn.mqttPort}
//#define MY_MQTT_USER "username"
//#define MY_MQTT_PASSWORD "password"
//#define MY_MQTT_CLIENT_ID "mysensors-1"
//#define MY_MQTT_PUBLISH_TOPIC_PREFIX "mygateway1-out"
//#define MY_MQTT_SUBSCRIBE_TOPIC_PREFIX "mygateway1-in"
`;
  }

  return `
/**********************************
 * MySensors gateway configuration
 */
${gatewayType}
${['ethernet', 'esp8266'].includes(node.gatewayType) ? ipSettings : ''}
${['ethernet', 'esp8266'].includes(node.gatewayType) ? connType : ''}

// Gateway inclusion mode
//#define MY_INCLUSION_MODE_FEATURE
//#define MY_INCLUSION_BUTTON_FEATURE
//#define MY_INCLUSION_MODE_DURATION 60
//#define MY_DEFAULT_LED_BLINK_PERIOD 300

// Gateway Leds settings
//#define MY_DEFAULT_ERR_LED_PIN 4
//#define MY_DEFAULT_RX_LED_PIN  5
//#define MY_DEFAULT_TX_LED_PIN  6
`};

export const nodeManagerConfiguration = (network, node) => `
/***********************************
 * NodeManager configuration
 */

// if enabled, enable debug messages on serial port
//#define DEBUG 1

#define POWER_MANAGER ${node.sensors.some(s => s.usePowerPin) ? '1' : '0'}
#define BATTERY_MANAGER ${node.battery.powered ? '1' : '0'}
// if enabled, allow modifying the configuration remotely by interacting with the configuration child id
#define REMOTE_CONFIGURATION 1
// if enabled, persist the configuration settings on EEPROM
#define PERSIST 0
// if enabled, a battery sensor will be created at BATTERY_CHILD_ID and will report vcc voltage together with the battery level percentage
#define BATTERY_SENSOR ${node.battery.powered ? '1' : '0'}
// if enabled, send a SLEEPING and AWAKE service messages just before entering and just after leaving a sleep cycle and STARTED when starting/rebooting
#define SERVICE_MESSAGES 0

// Enable this module to use one of the following sensors: SENSOR_ANALOG_INPUT, SENSOR_LDR, SENSOR_THERMISTOR, SENSOR_MQ, SENSOR_ML8511, SENSOR_ACS712, SENSOR_RAIN_GAUGE
#define MODULE_ANALOG_INPUT ${node.sensors.some(s => ['analogInput', 'ldr', 'thermistor', 'acs712'].includes(s.type)) ? '1' : '0'}
// Enable this module to use one of the following sensors: SENSOR_DIGITAL_INPUT
#define MODULE_DIGITAL_INPUT ${node.sensors.some(s => s.type === 'digitalInput') ? '1' : '0'}
// Enable this module to use one of the following sensors: SENSOR_DIGITAL_OUTPUT, SENSOR_RELAY, SENSOR_LATCHING_RELAY
#define MODULE_DIGITAL_OUTPUT ${node.sensors.some(s => ['relay', 'latchingRelay', 'digitalOutput'].includes(s.type)) ? '1' : '0'}
// Enable this module to use one of the following sensors: SENSOR_DHT11, SENSOR_DHT22
#define MODULE_DHT 0
// Enable this module to use one of the following sensors: SENSOR_SHT21
#define MODULE_SHT21 0
// Enable this module to use one of the following sensors: SENSOR_SWITCH, SENSOR_DOOR, SENSOR_MOTION
#define MODULE_SWITCH ${node.sensors.some(s => ['inputSwitch', 'door', 'motion'].includes(s.type)) ? '1' : '0'}
// Enable this module to use one of the following sensors: SENSOR_DS18B20
#define MODULE_DS18B20 0
// Enable this module to use one of the following sensors: SENSOR_BH1750
#define MODULE_BH1750 0
// Enable this module to use one of the following sensors: SENSOR_MLX90614
#define MODULE_MLX90614 0
// Enable this module to use one of the following sensors: SENSOR_BME280
#define MODULE_BME280 0
// Enable this module to use one of the following sensors: SENSOR_SONOFF
#define MODULE_SONOFF 0
// Enable this module to use one of the following sensors: SENSOR_BMP085
#define MODULE_BMP085 0
// Enable this module to use one of the following sensors: SENSOR_HCSR04
#define MODULE_HCSR04 0
// Enable this module to use one of the following sensors: SENSOR_MCP9808
#define MODULE_MCP9808 0
`;

export default ({ network, nodeId }) => {
  const node = network.nodes.find(n => n.id === nodeId);

  return `
#ifndef config_h
#define config_h
${sketchConfiguration(network, node)}
${nodeConfiguration(network, node)}
${radioConfiguration(network, node)}
${gatewayConfiguration(network, node)}
${nodeManagerConfiguration(network, node)}
#endif
`
};
