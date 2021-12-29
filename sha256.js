const crypto = require('crypto');

function getHash(str) {
  const hash = crypto.createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
}

module.exports = getHash;
