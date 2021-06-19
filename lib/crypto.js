import aes256 from 'aes256';

const encrypt = (secret, payload) => {
    return aes256.encrypt(secret, payload);
};

const decrypt = (secret, payload) => {
    return aes256.decrypt(secret, payload);
};

const encryptCookie = (data) => {
    return encrypt(process.env.COOKIE_SECRET, data);
};

const decryptCookie = (data) => {
    return decrypt(process.env.COOKIE_SECRET, data);
};

const encryptSession = (data) => {
    return encrypt(process.env.SESSION_SECRET, data);
};

const decryptSession = (data) => {
    return decrypt(process.env.SESSION_SECRET, data);
};

export { encrypt, decrypt, encryptCookie, encryptSession, decryptCookie, decryptSession };
