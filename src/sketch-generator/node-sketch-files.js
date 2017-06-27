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

    lines.push(`nm.setSleep(1, ${node.sleepTime}, ${node.sleepUnit.toUpperCase()});`);
    lines.push('');
  }

  lines.push(...getSensorLines(network, nodeId));

  return lines.join('\n  ');
}

export const generateSketch = nodeParams => `
// load user settings
#include "config.h"
// load MySensors library
#include <MySensors.h>
// load NodeManager library
#include "NodeManager.h"

// create a NodeManager instance
NodeManager nm;

// before
void before() {
  // setup the serial port baud rate
  Serial.begin(9600);

  ${initialize(nodeParams)}

  nm.before();
}

// presentation
void presentation() {
  // call NodeManager presentation routine
  nm.presentation();
}

// setup
void setup() {
  // call NodeManager setup routine
  nm.setup();
}

// loop
void loop() {
  // call NodeManager loop routine
  nm.loop();
}

// receive
void receive(const MyMessage &message) {
  // call NodeManager receive routine
  nm.receive(message);
}

// receiveTime
void receiveTime(unsigned long ts) {
  // call NodeManager receiveTime routine
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
