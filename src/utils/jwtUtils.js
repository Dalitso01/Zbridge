import { jwtVerify, SignJWT } from "jose";

/**
 * Verifies a JWT token using the provided public key.
 * @param {string} token - The JWT token to verify.
 * @param {CryptoKey} publicKey - The public key to verify the token.
 * @returns {Promise<Object>} - The payload of the verified token.
 */
export const verifyToken = async (token, publicKey) => {
  const { payload } = await jwtVerify(token, publicKey);
  return payload;
};

/**
 * Signs a payload into a JWT token using the provided private key.
 * @param {Object} payload - The payload to sign.
 * @param {CryptoKey} privateKey - The private key to sign the token.
 * @returns {Promise<string>} - The signed JWT token.
 */
export const signToken = async (payload, privateKey) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(privateKey);
  return token;
};