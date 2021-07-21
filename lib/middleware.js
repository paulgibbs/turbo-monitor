import { parse } from 'cookie';
import { getSessionById, parseSecureSessionId } from './session';
import { AUTH_COOKIE_NAME } from './auth';
import { User } from '../db/models/User';

const getSession = async ({ req }) => {
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

export { getSession };
