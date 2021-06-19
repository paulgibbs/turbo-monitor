import crypto from 'crypto';
import cookie from 'cookie-signature';

import { db } from '../db/db';
import { encryptCookie, decryptCookie, decryptSession } from './crypto';

const createSessionId = () => {
    return crypto.randomBytes(32).toString('base64');
};

const createSecureSessionId = (id) => {
    return encryptCookie(cookie.sign(id, process.env.COOKIE_SIGNATURE_SECRET));
};

const parseSecureSessionId = (value) => {
    return cookie.unsign(decryptCookie(value), process.env.COOKIE_SIGNATURE_SECRET);
};

const getSession = async (id) => {
    const { payload } = await db.select().from('sessions').where('id', id).first();
    const data = decryptSession(payload);
    return JSON.parse(data);
};

export { createSessionId, createSecureSessionId, parseSecureSessionId, getSession };
