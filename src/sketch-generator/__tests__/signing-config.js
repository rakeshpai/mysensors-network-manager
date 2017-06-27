import { securityConfiguration } from '../generate-config-h';

const match = expect.stringMatching;

it('sets up software signing', () => {
  const output = securityConfiguration({}, {
    signing: 'software',
    softSigningPin: 'A7'
  });

  expect(output).toEqual(match(/\n#define MY_SIGNING_SOFT/));
  expect(output).toEqual(match(/\n#define MY_SIGNING_SOFT_RANDOMSEED_PIN 7/));
  expect(output).toEqual(match(/\n#define MY_SIGNING_REQUEST_SIGNATURES/));
});

it('sets up ATSHA signing', () => {
  const output = securityConfiguration({}, {
    signing: 'atsha',
    atshaSigningPin: 'A3'
  });

  expect(output).toEqual(match(/\n#define MY_SIGNING_ATSHA204/));
  expect(output).toEqual(match(/\n#define MY_SIGNING_ATSHA204_PIN 3/));
  expect(output).toEqual(match(/\n#define MY_SIGNING_REQUEST_SIGNATURES/));
});
