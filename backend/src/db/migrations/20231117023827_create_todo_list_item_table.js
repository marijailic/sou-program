/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
    return knex.schema.createTable('todo_list_item', (table) => {
        table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());

        table.string('title').notNullable();
        table.text('text');
        table.boolean('is_completed').notNullable();
        table.timestamps(true, true);

        table
            .uuid('assignee_id')
            .references('id')
            .inTable('user')
            .onDelete('set null');
        table
            .uuid('todo_list_id')
            .references('id')
            .inTable('todo_list')
            .onDelete('cascade');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    await knex.schema.dropTable('todo_list_item');
};
