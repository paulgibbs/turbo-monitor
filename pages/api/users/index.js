import { User } from '../../../db/models/User';
import db from '../../../db/db';

const handler = async (req, res) => {
    const { method, body } = req;
    const { name, email, password } = body;

    try {
        switch (method) {
            case 'GET':
                res.status(200).json({
                    data: await User.query(),
                });
                break;
            case 'POST':
                res.status(201).json({
                    data: await User.query().insert({
                        name: name,
                        email: email,
                        password: password,
                        created_at: db.raw('NOW()'),
                        updated_at: db.raw('NOW()'),
                    }),
                });
                break;
            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end();
                break;
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
