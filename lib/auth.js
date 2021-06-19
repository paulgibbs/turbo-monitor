import argon2 from 'argon2';

const AUTH_COOKIE_NAME = 'turbo.auth';

const hashPassword = async (password) => {
    return await argon2.hash(password);
};

const checkPassword = async (hash, password) => {
    return await argon2.verify(hash, password);
};

export { AUTH_COOKIE_NAME, hashPassword, checkPassword };
