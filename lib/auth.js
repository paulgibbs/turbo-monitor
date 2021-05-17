const argon2 = require('argon2');

const hashPassword = async (password) => {
    return await argon2.hash(password);
};

const checkPassword = async (hash, password) => {
    return await argon2.verify(hash, password);
};

module.exports = {
    hashPassword,
    checkPassword,
};