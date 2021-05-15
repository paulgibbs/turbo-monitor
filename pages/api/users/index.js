import { User } from '../../../db/models/User';
import db from '../../../db/db';
import { hashPassword } from '../../../lib/auth';

const handler = async (req, res) => {
    const { method, body } = req;
    try {
        if (method === 'GET') {
            res.status(200).json({
                data: await User.query(),
            });
        } else if (method === 'POST') {
            const { name, email, password } = body;

            const user = await User.query().insert({
                name: name,
                email: email,
                password: typeof password !== 'undefined' ? await hashPassword(password) : undefined,
                created_at: db.raw('NOW()'),
                updated_at: db.raw('NOW()'),
            });
            res.status(201).json({
                data: user,
            });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end();
        }
    } catch (err) {
        res.status(500).json({
            error: {
                status: 500,
                message: process.env.NODE_ENV !== 'production' ? err.message : 'An unexpected error occurred',
            },
        });
    }
};

export default handler;
