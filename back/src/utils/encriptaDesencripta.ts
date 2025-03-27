import * as crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const hex = process.env.TOKEN_PASS;

function encryptAES(text: string, key: string): string {
  // Asegúrate de que la clave tenga 32 bytes para AES-256.
  const keyBuffer = Buffer.from(key, 'hex');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', keyBuffer, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // El IV se guarda junto al cifrado, separado por ':'
  return iv.toString('hex') + ':' + encrypted;
}

function decryptAES(encryptedText: string, key: string): string {
  const keyBuffer = Buffer.from(key, 'hex');
  const parts = encryptedText.split(':');
  const iv = Buffer.from(parts.shift() as string, 'hex');
  const encrypted = parts.join(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuffer, iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Uso:
if (!hex) {
  throw new Error('TOKEN_PASS no está definido en las variables de entorno');
}
if (hex.length !== 64) {
  throw new Error('TOKEN_PASS debe tener 64 caracteres hexadecimales para AES-256 (32 bytes)');
}

const key = hex; // Utiliza la clave definida en TOKEN_PASS para encriptar
const mensaje = "Texto a encriptar";
const cifrado = encryptAES(mensaje, key);
console.log("Cifrado:", cifrado);
const descifrado = decryptAES(cifrado, key);
console.log("Descifrado:", descifrado);