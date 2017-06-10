import { nodeConfiguration } from '../generate-config-h';

const match = expect.stringMatching;

it('sets the baud to 9600', () => {
  expect(nodeConfiguration()).toEqual(match(/\n#define MY_BAUD_RATE 9600/));
});
