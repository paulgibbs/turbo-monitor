import { Model } from 'objection';

import { db } from '../db/db';
import { hashPassword } from '../../lib/auth';

Model.knex(db);

class User extends Model {
    static get tableName() {
        return 'users';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                id: { type: 'integer' },
                email: { type: 'string' },
                password: { type: 'string' },
                name: { type: 'string' },
                created_at: { type: 'timestamp' },
                updated_at: { type: 'timestamp' },
            },
        };
    }
    $formatJson(json) {
        json = super.$formatJson(json);
        if (json.password) {
            delete json.password;
        }
        return json;
    }
    async $beforeInsert(...args) {
        await super.$beforeInsert(...args);

        this.password = await hashPassword(this.password);
    }
    async $beforeUpdate(queryOptions, ...args) {
        await super.$beforeUpdate(queryOptions, ...args);

        if (queryOptions.patch && this.password === undefined) {
            return;
        }

        this.password = await hashPassword(this.password);
    }
}

export { User };
