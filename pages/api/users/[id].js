import * as yup from 'yup';

import { User } from '../../../db/models/User';
import { db } from '../../../db/db';
import { withAuth } from '../../../lib/middleware';

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

export default withAuth(handler);
