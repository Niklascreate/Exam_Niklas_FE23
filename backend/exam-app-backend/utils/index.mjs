import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const saltRounds = 10;
const secretKey = process.env.SECRET_ACCESS_KEY;

export const hashPassword = async (password) => {
    return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (password, storedPassword) => {
    return await bcrypt.compare(password, storedPassword);
};

export const generateJWT = (user) => {
    const payload = {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
    };

    if (!secretKey) {
        throw new Error("SECRET_ACCESS_KEY saknas!");
    }

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyJWT = (token) => {
    if (!secretKey) {
        throw new Error("SECRET_ACCESS_KEY saknas!");
    }

    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};
