import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLES.ORDER, t => {
            t.string("signed_name").nullable()
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLES.ORDER, t => {
        t.dropColumn("signed_name")
    })
}

