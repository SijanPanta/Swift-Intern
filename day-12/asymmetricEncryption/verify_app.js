const http = require('http');
const crypto = require('crypto');

// Helpers for http request
const get = (url) => new Promise((resolve, reject) => {
    http.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
        res.on('error', reject);
    });
});

const post = (url, body) => new Promise((resolve, reject) => {
    const req = http.request(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
        res.on('error', reject);
    });
    req.write(JSON.stringify(body));
    req.end();
});

async function test() {
    try {
        console.log('1. Fetching Public Key...');
        const { publicKey } = await get('http://localhost:3000/public-key');
        console.log('Public Key received.');

        const originalText = "Super Secret Message";
        console.log(`2. Encrypting: "${originalText}"`);

        // Node.js client-side encryption (simulating browser)
        const encrypted = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING,
            },
            Buffer.from(originalText)
        );
        const encryptedBase64 = encrypted.toString('base64');

        console.log('3. Sending Encrypted Data...');
        const result = await post('http://localhost:3000/decrypt', { encryptedData: encryptedBase64 });

        if (result.success && result.decryptedData === originalText) {
            console.log('SUCCESS: Server correctly decrypted the message!');
        } else {
            console.error('FAILURE: Server returned:', result);
        }

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

// Give server a moment to start if run immediately after
setTimeout(test, 1000);
