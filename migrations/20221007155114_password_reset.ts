import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
            .createTable('password_reset',k=>
            {
                k.string("reset_code"),
                k.integer("UserID").references("id").inTable("user");
            }
            )
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("password_reset");
}

