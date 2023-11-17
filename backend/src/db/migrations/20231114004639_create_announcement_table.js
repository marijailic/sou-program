/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema.createTable('announcement', (table) => {
        table.uuid('id', { primaryKey: true }).defaultTo(knex.fn.uuid());

        table.text('text');
        table.string('picture_key');
        table.timestamps(true, true);

        table
            .uuid('author_id')
            .references('id')
            .inTable('user')
            .onDelete('set null');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
    await knex.schema.dropTable('announcement');
};
