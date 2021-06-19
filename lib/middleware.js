import { parse } from 'cookie';
import { getSession, parseSecureSessionId } from './session';
import { AUTH_COOKIE_NAME } from './auth';

// TODO: validate a token is legit
// TODO: lookup relevant user in users table

const authenticate = async (req) => {
    const cookies = parse(req.headers.cookie ?? '');
    const secureAuthCookie = cookies[AUTH_COOKIE_NAME];

    if (secureAuthCookie) {
        const { auth } = await getSession(parseSecureSessionId(secureAuthCookie));
        if (!auth) {
            throw new Error('Not Authenticated');
        }
    } else {
        throw new Error('Not Authenticated');
    }
};

export { authenticate };
