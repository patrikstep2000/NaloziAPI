import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLES.PRINTER, t => {
        t.boolean('deleted').nullable().defaultTo(false)
    })
}


export async function down(knex: Knex): Promise<void> {
}

