import { table } from "console";
import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLES.USER, t => {
        t.dateTime('deleted_at').nullable().defaultTo(null)
    })
}

export async function down(knex: Knex): Promise<void> {
}

