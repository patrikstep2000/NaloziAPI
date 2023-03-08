import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLES.PRINTER, t => {
            t.dropColumn("type_id")
        })
        .alterTable(TABLES.PRINTER_MODEL, t => {
            t.integer("type_id")
             .notNullable()
             .references("id")
             .inTable(TABLES.PRINTER_TYPE)
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLES.PRINTER_MODEL, t => {
            t.dropColumn("type_id")
        })
}

