import * as yup from 'yup';
import { serialize } from 'cookie';
import dayjs from 'dayjs';

import { db } from '../../db/db';
import { User } from '../../db/models/User';
import { checkPassword, AUTH_COOKIE_NAME } from '../../lib/auth';
import { createSessionId, createSecureSessionId } from '../../lib/session';
import { encryptSession } from '../../lib/crypto';

const handler = async (req, res) => {
    const { method, body } = req;
    try {
        if (method === 'POST') {
            const { email, password } = body;

            const schema = yup.object().shape({
                email: yup.string().email().required(),
                password: yup.string().required(),
            });

            await schema.validate({ email, password });

            const user = await User.query().where('email', email).first();

            if (user instanceof User) {
                const isValidPassword = await checkPassword(user.password, password);
                if (isValidPassword) {
                    const sessionId = createSessionId();
                    const secureSessionId = createSecureSessionId(sessionId);
                    await db
                        .insert([
                            {
                                id: sessionId,
                                user_id: user.id,
                                ip_address: req.headers['X-Forwarded-For'] ?? req.connection.remoteAddress,
                                user_agent: req.headers['user-agent'] ?? '',
                                payload: encryptSession(
                                    JSON.stringify({
                                        auth: user.id,
                                    })
                                ),
                                last_activity: dayjs().unix(),
                            },
                        ])
                        .into('sessions');

                    const authCookie = serialize(AUTH_COOKIE_NAME, secureSessionId, {
                        expires: dayjs().add(2, 'weeks').toDate(),
                        httpOnly: true,
                        path: '/',
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite: 'strict',
                    });
                    res.setHeader('Set-Cookie', authCookie);
                    return res.status(200).json({
                        data: user,
                    });
                }
            }
            res.status(401).json({
                error: {
                    status: 401,
                    message: 'The email or password is incorrect',
                },
            });
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end();
        }
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            return res.status(422).json({
                errors: err.errors.map((message) => ({
                    status: 422,
                    title: 'Validation Erorr',
                    detail: message,
                })),
            });
        } else {
            res.status(500).json({
                errors: [
                    {
                        status: 500,
                        title: 'Unexpected Error',
                        detail: process.env.APP_DEBUG ? err.message : 'An unexpected error occurred',
                    },
                ],
            });
        }
    }
};

export default handler;
