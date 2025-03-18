const crypto = require("crypto");
const cryptoOrigCreateHash = crypto.createHash;
crypto.createHash = algorithm =>
  cryptoOrigCreateHash(algorithm === "md4" ? "sha256" : algorithm);