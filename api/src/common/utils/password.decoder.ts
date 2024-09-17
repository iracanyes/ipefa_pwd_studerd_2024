/**
 * Crypto utils method for encoding and comparing passwords
 */
import * as bcrypt from 'bcrypt';

export const encryptPassword = async (plaintext: string) =>
  await bcrypt.hash(plaintext, 10);

export const comparePassword = async (plaintext: string, hash: string) =>
  await bcrypt.compare(plaintext, hash);
