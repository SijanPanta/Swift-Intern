const express = require('express');
const crypto = require('crypto');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Generate RSA Keys
// We use 2048 bit keys for good security balance.
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem'
  }
});

console.log('Keys generated successfully.');

// Endpoint to get the public key
app.get('/public-key', (req, res) => {
  res.send({ publicKey });
});

// Endpoint to decrypt data
app.post('/decrypt', (req, res) => {
  const { encryptedData } = req.body;
  if (!encryptedData) {
    return res.status(400).send({ error: 'No encrypted data provided' });
  }

  try {
    const decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING, 
      },
      Buffer.from(encryptedData, 'base64')
    );

    const decryptedString = decryptedData.toString('utf8');
    console.log('--------------------------------------------------');
    console.log('Received Encrypted:', encryptedData.substring(0, 30) + '...');
    console.log('Decrypted Data:', decryptedString);
    console.log('--------------------------------------------------');

    res.send({ success: true, decryptedData: decryptedString });
  } catch (error) {
    console.error('Decryption error:', error);
    res.status(500).send({ error: 'Decryption failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
