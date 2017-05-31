const convertToHex = hexString => hexString.match(/.{2}/g).map(x => `0x${x}`).join();

export default ({ network, nodeId }, text) => {
  return text
    .split('\n')
    .map(line => {
      if(line.trim().startsWith('#define MY_HMAC_KEY')) {
        return `#define MY_HMAC_KEY ${convertToHex(network.hmac)}`;
      }

      if(line.trim().startsWith('#define MY_AES_KEY')) {
        return `#define MY_AES_KEY ${convertToHex(network.aes)}`;
      }

      if(line.trim().startsWith('#define MY_SOFT_SERIAL')) {
        return `#define MY_SOFT_SERIAL ${convertToHex(network.nodes.find(n => n.id === nodeId).key)}`;
      }

      if(line.trim() === '//#define PERSONALIZE_SOFT') {
        return `#define PERSONALIZE_SOFT`;
      }

      return line;
    })
    .join('\n');
};
