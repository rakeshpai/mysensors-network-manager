import generateConfig from './generate-config-h';
import getSensorLines from './sensor-lines';

const initialize = ({ network, nodeId }) => {
  const node = network.nodes.find(n => n.id === nodeId);

  const lines = [];

  if(node.battery.powered) {
    lines.push('// Battery configuration')
    lines.push(`nm.setBatteryMin(${node.battery.min});`);
    lines.push(`nm.setBatteryMax(${node.battery.max});`);
    lines.push('');

    if(node.battery.measure === 'external') {
      lines.push(`nm.setBatteryInternalVcc(false);`);
      lines.push(`nm.setBatteryPin(${node.battery.measurePin});`);
      lines.push(`nm.setBatteryVoltsPerBit(${node.battery.voltsPerBit});`);
      lines.push('');
    }

    lines.push(`nm.setSleep${node.sleepUnit.charAt(0).toUpperCase()}${node.sleepUnit.slice(1)}(${node.sleepTime});`);
    lines.push('');
  }

  lines.push(...getSensorLines(network, nodeId));

  return lines.join('\n  ');
}

export const generateSketch = nodeParams => `
#include "config.h"
#include <MySensors.h>
#include "NodeManager.h"

// NodeManager instance
NodeManager nm;

void before() {
  // setup the serial port baud rate
  Serial.begin(9600);

  ${initialize(nodeParams)}
  nm.before();
}

void presentation() {
  nm.presentation();
}

void setup() {
  nm.setup();
}

void loop() {
  nm.loop();
}

void receive(const MyMessage &message) {
  nm.receive(message);
}

void receiveTime(unsigned long ts) {
  nm.receiveTime(ts);
}
`;

export default (nodeParams, sketchName) => ([
  { name: 'config.h', contents: generateConfig(nodeParams) },
  { name: `${sketchName}.ino`, contents: generateSketch(nodeParams) }
]);

export const platformini = (nodeParams) => `
; PlatformIO Project Configuration File
;
;   Build options: build flags, source filter, extra scripting
;   Upload options: custom port, speed and extra flags
;   Library options: dependencies, extra library storages
;
; Please visit documentation for the other options and examples
; http://docs.platformio.org/en/stable/projectconf.html

[env:pro8MHzatmega328]
platform = atmelavr
framework = arduino
board = pro8MHzatmega328
lib_deps = https://github.com/mysensors/MySensors#development
`;
