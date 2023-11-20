/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    return knex.schema.createTable('todo_list', (table) => {
        table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());

        table.string('title').notNullable();
        table.text('text');
        table
            .uuid('created_by')
            .references('id')
            .inTable('user')
            .onDelete('set null');

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    await knex.schema.dropTable('todo_list');
};
