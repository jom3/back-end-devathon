import { genSalt, hash, compare } from "bcryptjs";

//Hash -> Password
export const encryptPassword = async (password: string) => {
    const salt = await genSalt(12);
    const passwordHashed = await hash(password,salt);
    return passwordHashed;
}

//Compare -> Password
export const comparePassword = async (passwordHashed,passwordToCompare) => {
    const result = await compare(passwordHashed,passwordToCompare);
    return result;
}