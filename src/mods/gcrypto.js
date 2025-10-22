/*
  Copyright (C) 2025 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.
  Licencia MIT
*/

const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const SHA3 = require("crypto-js/sha3");
const MD5 = require("crypto-js/md5");
const HMAC = require("crypto-js/hmac-sha256");
const RIPEMD160 = require("crypto-js/ripemd160");
const encUtf8 = require("crypto-js/enc-utf8");
const encHex = require("crypto-js/enc-hex");
const encBase64 = require("crypto-js/enc-base64");

const cripto = (function () {
  const supported = ["AES", "SHA256", "SHA3", "MD5", "HMAC", "RIPEMD160"];

  function normalize(protocol) {
    return protocol?.toUpperCase() || "";
  }

  function isSupported(protocol) {
    return supported.includes(normalize(protocol));
  }

  function encode(protocol, key, message) {
    const prot = normalize(protocol);
    if (!isSupported(prot)) throw new Error(`Protocolo no soportado: ${prot}`);

    switch (prot) {
      case "AES":
        return AES.encrypt(message, key).toString();
      case "SHA256":
        return SHA256(message).toString(encHex);
      case "SHA3":
        return SHA3(message).toString(encHex);
      case "MD5":
        return MD5(message).toString(encHex);
      case "RIPEMD160":
        return RIPEMD160(message).toString(encHex);
      case "HMAC":
        return HMAC(message, key).toString(encHex);
      default:
        throw new Error(`Protocolo no válido: ${prot}`);
    }
  }

  function decode(protocol, key, ciphertext) {
    const prot = normalize(protocol);
    if (prot !== "AES") throw new Error(`Solo AES permite descifrado. Protocolo: ${prot}`);

    try {
      const bytes = AES.decrypt(ciphertext, key);
      return bytes.toString(encUtf8);
    } catch (e) {
      throw new Error("Error al descifrar: clave incorrecta o mensaje corrupto.");
    }
  }

  function encodeObject(protocol, key, obj) {
    const json = JSON.stringify(obj);
    return encode(protocol, key, json);
  }

  function decodeObject(protocol, key, string) {
    const plain = decode(protocol, key, string);
    return JSON.parse(plain);
  }

  function sign(protocol, key, message) {
    const prot = normalize(protocol);
    if (prot === "HMAC") return HMAC(message, key).toString(encHex);
    throw new Error("Solo HMAC permite firmas digitales.");
  }

  function verify(protocol, key, message, signature) {
    const expected = sign(protocol, key, message);
    return expected === signature;
  }

  function generateToken(protocol, payload, secret) {
    const header = { alg: protocol, typ: "JWT" };
    const base64 = obj => Buffer.from(JSON.stringify(obj)).toString("base64url");
    const hmac = HMAC(base64(header) + "." + base64(payload), secret).toString(encBase64);
    return `${base64(header)}.${base64(payload)}.${hmac}`;
  }

  function verifyToken(token, secret) {
    const [headerB64, payloadB64, signature] = token.split(".");
    const hmac = HMAC(`${headerB64}.${payloadB64}`, secret).toString(encBase64);
    return hmac === signature;
  }

  function encryptFields(obj, fields, key) {
    const result = { ...obj };
    fields.forEach(f => {
      if (f in obj) result[f] = encode("AES", key, obj[f]);
    });
    return result;
  }

  function decryptFields(obj, fields, key) {
    const result = { ...obj };
    fields.forEach(f => {
      if (f in obj) result[f] = decode("AES", key, obj[f]);
    });
    return result;
  }

  function test(protocol) {
    const msg = "Unidos en la Muerte";
    const key = "fenixnova";
    const encoded = encode(protocol, key, msg);
    const decoded = protocol === "AES" ? decode(protocol, key, encoded) : null;
    return { encoded, decoded };
  }

  function benchmark(protocol) {
    const msg = "Unidos en la Muerte".repeat(1000);
    const key = "fenixnova";
    const start = performance.now();
    encode(protocol, key, msg);
    const end = performance.now();
    return { protocol, timeMs: end - start };
  }

  function info(protocol) {
    const prot = normalize(protocol);
    switch (prot) {
      case "AES": return { type: "Symmetric", blockSize: 128, reversible: true };
      case "SHA256": return { type: "Hash", length: 256, reversible: false };
      case "SHA3": return { type: "Hash", length: 512, reversible: false };
      case "MD5": return { type: "Hash", length: 128, reversible: false };
      case "RIPEMD160": return { type: "Hash", length: 160, reversible: false };
      case "HMAC": return { type: "Signature", keyBased: true, reversible: false };
      default: return { error: "Protocolo no reconocido" };
    }
  }

  return {
    encode,
    decode,
    encodeObject,
    decodeObject,
    sign,
    verify,
    generateToken,
    verifyToken,
    encryptFields,
    decryptFields,
    test,
    benchmark,
    info,
    isSupported,
    listProtocols: () => [...supported]
  };
})();

module.exports = cripto;
