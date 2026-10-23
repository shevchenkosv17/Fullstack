console.log('#58. JavaScript homework example file');

import { createHash, pbkdf2Sync } from 'crypto';

/*
 * #1
 */

const generateHash = (input) => {
  return createHash('sha256').update(input).digest('hex');
};

/*
 * #2
 */

const generatePasswordHash = (password, salt, iterations = 10000, keylen = 64, digest = 'sha512') => {
  const hash = pbkdf2Sync(password, salt, iterations, keylen, digest);
  return hash.toString('hex');
};

/*
 * #3
 */

const verifyPassword = (inputPassword, storedHash, salt, iterations = 10000, keylen = 64, digest = 'sha512') => {
  const inputHash = pbkdf2Sync(inputPassword, salt, iterations, keylen, digest).toString('hex');
  return inputHash === storedHash;
};

export { generateHash, generatePasswordHash, verifyPassword };
