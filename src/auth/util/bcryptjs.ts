import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

//Hash -> Password
export const encryptPassword = (password: string) =>
  hashSync(password, genSaltSync(12));

//Compare -> Password
export const comparePassword = (
  passwordToCompare: string,
  passwordHashed: string,
) => compareSync(passwordToCompare, passwordHashed);
