import * as yup from 'yup';

import { useHandler } from '../../../lib/http';
import { User } from '../../../db/models/User';
import { db } from '../../../db/db';
import { withSession } from '../../../lib/session';

const handler = async (req, res) => {
    const session = await withSession({ req });

    if (session === null) {
        return res.status(401).json({
            errors: [
                {
                    status: '401',
                    title: 'Not Authenticated',
                },
            ],
        });
    }

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

    if (method === 'GET') {
        res.status(200).json({
            data: user,
        });
    } else if (method === 'PUT') {
        const { name, email, password } = body;

        const schema = yup.object().shape({
            name: yup.string(),
            email: yup.string().email().required(),
            password: yup.string().min(8),
        });

        await schema.validate({ name, email, password });

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
};

export default useHandler(handler);
