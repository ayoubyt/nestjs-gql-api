import {randomBytes} from 'crypto';

import * as bcrypt from 'bcrypt';

const salt = 10;

export const hashText = async (text: string) => {
  const resultHash = await bcrypt.hash(text, salt);
  return resultHash;
};

export const verifyHashMatch = async (text: string, hash: string) => {
  const match = await bcrypt.compare(text, hash);
  return match;
};
