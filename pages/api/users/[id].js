import { User } from '../../../db/models/User';
import db from '../../../db/db';

const handler = async (req, res) => {
    const { query, method } = req;

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
        switch (method) {
            case 'GET':
                res.status(200).json({
                    data: user,
                });
                break;
            case 'PUT':
                await User.query()
                    .findById(user.id)
                    .patch({
                        updated_at: db.raw('NOW()'),
                    });
                res.status(204).end();
                break;
            case 'DELETE':
                await User.query().deleteById(user.id);
                res.status(204).end();
                break;
            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
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
