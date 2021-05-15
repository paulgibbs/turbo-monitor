const { Model } = require('objection');

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
}

module.exports = {
    User,
};
