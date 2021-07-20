import { parse } from 'cookie';
import { getSession, parseSecureSessionId } from './session';
import { AUTH_COOKIE_NAME } from './auth';
import { User } from '../db/models/User';

const withAuth = (handler) => {
    return async (req, res) => {
        const cookies = parse(req.headers.cookie ?? '');
        const secureAuthCookie = cookies[AUTH_COOKIE_NAME];

        if (secureAuthCookie) {
            const sessionId = parseSecureSessionId(secureAuthCookie);
            if (sessionId) {
                const { auth: user_id } = await getSession(sessionId);
                if (user_id) {
                    const user = await User.query().findById(user_id);
                    if (user instanceof User) {
                        req.auth = { user };
                        return handler(req, res);
                    }
                }
            }
        }

        return res.status(401).json({
            errors: [
                {
                    status: '401',
                    title: 'Not Authenticated',
                },
            ],
        });
    };
};

export { withAuth };
