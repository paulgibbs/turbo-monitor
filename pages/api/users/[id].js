import { User } from '../../../db/models/User';
import db from '../../../db/db';

const handler = async (req, res) => {
    const { query, body, method } = req;

    const user = await User.query().findById(query.id);

    if (!(user instanceof User)) {
        return res.status(404).json({
            error: {
                status: 404,
                message: 'The requested user could not be found',
            },
        });
    }

    try {
        if (method === 'GET') {
            res.status(200).json({
                data: user,
            });
        } else if (method === 'PUT') {
            const { name, email, password } = body;
            await User.query()
                .findById(user.id)
                .patch({
                    name: name,
                    email: email,
                    password: password,
                    updated_at: db.raw('NOW()'),
                });
            res.status(204).end();
        } else if (method === 'DELETE') {
            await User.query().deleteById(user.id);
            res.status(204).end();
        } else {
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end();
        }
    } catch (err) {
        res.status(500).json({
            error: {
                status: 500,
                message: process.env.APP_DEBUG ? err.message : 'An unexpected error occurred',
            },
        });
    }
};

export default handler;
