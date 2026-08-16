/**
 * AES 加密/解密工具
 * 基于 crypto-js，兼容浏览器与 Node.js
 */
import CryptoJS from "crypto-js";

export function decryptWithPassword(encrypted: string, pin: string) {
  const key = CryptoJS.MD5(pin);
  const iv = CryptoJS.SHA1(pin);
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv });
  return CryptoJS.enc.Utf8.stringify(decrypted);
}

export function encryptWithPassword(decrypted: string, pin: string) {
  const key = CryptoJS.MD5(pin);
  const iv = CryptoJS.SHA1(pin);
  const encrypted = CryptoJS.AES.encrypt(decrypted, key, { iv });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
