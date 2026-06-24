// const crypto = require('node:crypto');
// import crypto from "node:crypto";
import { generateKeyPairSync } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// Generate the key pair asynchronously
const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048, // Recommended standard length (or 4096)
  publicKeyEncoding: {
    type: "spki", // Standard Public Key Infrastructure format
    format: "pem", // Privacy-Enhanced Mail (PEM) string format
  },
  privateKeyEncoding: {
    type: "pkcs8", // Recommended secure private key standard format
    format: "pem",
    // Optional: cipher & passphrase can be added here to encrypt the private key
  },
});

// console.log("--- Public Key --- \n", publicKey);
// console.log("--- Private Key --- \n", privateKey);

fs.writeFileSync(path.join("__dirname", "../certs/private.pem"), privateKey);
fs.writeFileSync(path.join("__dirname", "../certs/public.pem"), publicKey);
