import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLES.TICKET_PRINTER, t => {
        t.string('details').nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLES.TICKET_PRINTER, t => {
        t.dropColumn('details')
    })
}

