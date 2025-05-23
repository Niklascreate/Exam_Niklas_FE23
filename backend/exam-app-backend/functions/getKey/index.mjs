import { keys } from '../../data/keys.mjs';
import { sendResponse } from '../../responses/index.mjs';

export const getRandomKey = async (event) => {
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    
    return sendResponse(200, randomKey);
};