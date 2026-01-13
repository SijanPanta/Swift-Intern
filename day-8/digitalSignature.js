const crypto = require("crypto");

console.log("Generating RSA key pair...\n");

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

console.log("Keys generated!");
console.log(
  "Private Key (keep secret!):\n",
  privateKey.substring(0, 50) + "...\n"
);
console.log(
  "Public Key (share freely):\n",
  publicKey.substring(0, 50) + "...\n"
);

const data = "Important document: Transfer $1000 to Alice";
console.log("Original data:", data, "\n");

//create sign
const sign = crypto.createSign("SHA256");
sign.update(data);
sign.end();

//generate signature using sign
const signature = sign.sign(privateKey, "hex");
console.log("Digital Signature:", signature.substring(0, 50) + "...\n");

console.log("Verifying signature...\n");

//create verify variable
const verify = crypto.createVerify("SHA256");
verify.update(data);
verify.end();

//use the verify variable to verify the data
const isValid = verify.verify(publicKey, signature, "hex");
console.log("Signature is valid:", isValid, "\n");

console.log("Testing tampering detection...\n");

const tamperedData = "Important document: Transfer $9999 to Bob";
const verifyTampered = crypto.createVerify("SHA256");
verifyTampered.update(tamperedData);
verifyTampered.end();

const isTamperedValid = verifyTampered.verify(publicKey, signature, "hex");
console.log("Tampered data validation:", isTamperedValid);
console.log("   (Should be false - tampered data detected!)\n");

console.log("Testing with a different key pair...\n");

const { publicKey: wrongPublicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

const verifyWrongKey = crypto.createVerify("SHA256");
verifyWrongKey.update(data);
verifyWrongKey.end();

const isWrongKeyValid = verifyWrongKey.verify(wrongPublicKey, signature, "hex");
console.log("Validation with wrong public key:", isWrongKeyValid);
console.log("   (Should be false - wrong key detected!)\n");
