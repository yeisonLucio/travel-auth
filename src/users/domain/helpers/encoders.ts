import {genSalt, hash,compare} from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds)
    const hashedPassword = await hash(password, salt)
    return hashedPassword;
};

export const validatePassword = async (currentPassword: string, receivedPassword: string): Promise<boolean> => {
    return await compare(receivedPassword, currentPassword)
}