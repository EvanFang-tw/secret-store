require('dotenv').config()

const crypto = require('crypto');

const sha256 = require('./sha256');

const IV = process.env.IV

function encrypt(key, data) {
  // aes-256-cbc key length should be 32 bytes
  const aesKey = sha256(key).substring(0,32);
  const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, IV);
  let crypted = cipher.update(data, 'utf8', 'binary');
  crypted += cipher.final('binary');
  crypted = Buffer.from(crypted, 'binary').toString('base64');
  return crypted;
};


function decrypt(key, crypted) {
  const aesKey = sha256(key).substring(0,32);
  crypted = Buffer.from(crypted, 'base64').toString('binary');
  const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, IV);
  let decoded = decipher.update(crypted, 'binary', 'utf8');
  decoded += decipher.final('utf8');
  return decoded;
};

module.exports = {
  encrypt,
  decrypt
}