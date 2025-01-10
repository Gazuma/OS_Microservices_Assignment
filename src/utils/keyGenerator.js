const crypto = require('crypto');
const fs = require('fs');

// Generate Client's RSA key pair
const clientKeys = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
});

// Generate Server's RSA key pair
const serverKeys = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
});

// Save keys to files
fs.writeFileSync('client_private.pem', clientKeys.privateKey);
fs.writeFileSync('client_public.pem', clientKeys.publicKey);
fs.writeFileSync('server_private.pem', serverKeys.privateKey);
fs.writeFileSync('server_public.pem', serverKeys.publicKey);

console.log('Keys generated and saved to files.');
