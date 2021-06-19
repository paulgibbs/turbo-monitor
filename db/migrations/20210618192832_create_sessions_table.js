exports.up = (knex) => {
    return knex.schema.createTable('sessions', (table) => {
        table.string('id').primary().unique();
        table.integer('user_id').unsigned().index().nullable();
        table.string('ip_address', 45).nullable();
        table.text('user_agent').nullable();
        table.text('payload');
        table.integer('last_activity').index();

        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('sessions');
};
