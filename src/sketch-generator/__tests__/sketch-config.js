import { sketchConfiguration } from '../generate-config-h';

const match = expect.stringMatching

it('sets the sketch name', () => {
  expect(
    sketchConfiguration({}, {
      name: 'MagicSmokeEmitter',
      battery: {}
    }
  )).toEqual(match(/\n#define SKETCH_NAME "MagicSmokeEmitter"\n/));
});

it('sets repeater mode when it\'s not battery powered', () => {
  expect(
    sketchConfiguration({}, {
      battery: { powered: false }
    }
  )).toEqual(match(/\n#define MY_REPEATER_FEATURE\n/));
});

it('sets the sketch version');
