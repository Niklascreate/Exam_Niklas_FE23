import jwt from 'jsonwebtoken';
import 'dotenv/config';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

export const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

export const comparePasswords = async (password, storedPassword) => {
    const isEqual = await bcrypt.compare(password, storedPassword);
    return isEqual;
};

export const generateJWT = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, { expiresIn: '1h' });

    return token;
};
