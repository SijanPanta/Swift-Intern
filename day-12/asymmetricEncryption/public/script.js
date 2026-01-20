document.addEventListener('DOMContentLoaded', async () => {
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const resultDiv = document.getElementById('result');

    let publicKey = null;

    // Fetch Public Key on load
    try {
        const response = await fetch('/public-key');
        const data = await response.json();
        publicKey = data.publicKey;
        console.log('Public key fetched successfully');
    } catch (err) {
        console.error('Failed to fetch public key', err);
        resultDiv.textContent = 'Error: Could not fetch public key from server.';
        resultDiv.className = 'error';
        resultDiv.style.display = 'block';
    }

    sendBtn.addEventListener('click', async () => {
        const message = messageInput.value;
        if (!message) {
            alert('Please enter a message');
            return;
        }

        if (!publicKey) {
            alert('Public key not loaded yet.');
            return;
        }

        // Encrypt with JSEncrypt
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        const encrypted = encrypt.encrypt(message);

        if (!encrypted) {
            resultDiv.textContent = 'Encryption failed. Message might be too long for RSA key size.';
            resultDiv.className = 'error';
            resultDiv.style.display = 'block';
            return;
        }

        console.log('Encrypted Data:', encrypted);

        // Send to server
        try {
            const res = await fetch('/decrypt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ encryptedData: encrypted })
            });
            const result = await res.json();

            if (result.success) {
                resultDiv.innerHTML = `<strong>Success!</strong> Server decrypted: <span class="success">${result.decryptedData}</span>`;
                resultDiv.className = '';
            } else {
                resultDiv.textContent = 'Server failed to decrypt.';
                resultDiv.className = 'error';
            }
        } catch (err) {
            resultDiv.textContent = 'Error connecting to server.';
            resultDiv.className = 'error';
        }

        resultDiv.style.display = 'block';
    });
});
