import crypto from 'crypto';
import cookie from 'cookie-signature';
import { parse } from 'cookie';

import { AUTH_COOKIE_NAME } from './auth';
import { User } from '../db/models/User';
import { db } from '../db/db';
import { encryptCookie, decryptCookie, decryptSession } from './crypto';

const sessionLengthInSeconds = 60 * 60 * 24 * 30;

const createSessionId = () => {
    return crypto.randomBytes(32).toString('base64');
};

const createSecureSessionId = (id) => {
    return encryptCookie(cookie.sign(id, process.env.COOKIE_SIGNATURE_SECRET));
};

const parseSecureSessionId = (value) => {
    return cookie.unsign(decryptCookie(value), process.env.COOKIE_SIGNATURE_SECRET);
};

const getSessionById = async (id) => {
    const sessionRecord = await db.select().from('sessions').where('id', id).first();
    if (!sessionRecord) {
        return {};
    }
    const { payload, last_activity } = await db.select().from('sessions').where('id', id).first();
    const now = Date.now() / 1000;
    if (last_activity + sessionLengthInSeconds < now) {
        return {};
    }
    const data = decryptSession(payload);
    return JSON.parse(data);
};

const removeSessionById = async (id) => {
    await db.delete().from('sessions').where('id', id);
};

const withSession = async ({ req }) => {
    const cookies = parse(req.headers.cookie ?? '');
    const secureAuthCookie = cookies[AUTH_COOKIE_NAME];

    if (secureAuthCookie) {
        const sessionId = parseSecureSessionId(secureAuthCookie);
        if (sessionId) {
            const { auth: user_id } = await getSessionById(sessionId);
            if (user_id) {
                const user = await User.query().findById(user_id);
                if (user instanceof User) {
                    return {
                        id: sessionId,
                        auth: {
                            user,
                        },
                    };
                }
            }
        }
    }

    return null;
};

export { withSession, createSessionId, createSecureSessionId, parseSecureSessionId, getSessionById, removeSessionById };
