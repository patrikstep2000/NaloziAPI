import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
            .createTable('deleted_user', u => {
                u.increments('id').primary(),
                u.string('first_name').notNullable(),
                u.string('last_name').notNullable(),
                u.string('email').notNullable(),
                u.integer('old_id').notNullable()
            })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('deleted_user')
}



