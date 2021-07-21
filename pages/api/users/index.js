import * as yup from 'yup';

import { useHandler } from '../../../lib/http';
import { User } from '../../../db/models/User';
import { db } from '../../../db/db';
import { getSession } from '../../../lib/middleware';

const handler = async (req, res) => {
    const session = await getSession({ req });

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

    const { method, body } = req;

    if (method === 'GET') {
        res.status(200).json({
            data: await User.query(),
            session,
        });
    } else if (method === 'POST') {
        const { name, email, password } = body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required(),
            password: yup.string().min(8).required(),
        });

        await schema.validate({ name, email, password });

        const user = await User.query().insert({
            name: name,
            email: email,
            password: password,
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
};

export default useHandler(handler);
