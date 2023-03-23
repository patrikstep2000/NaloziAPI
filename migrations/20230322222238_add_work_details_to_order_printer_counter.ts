import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLES.ORDER_PRINTER_COUNTER, t => {
        t.string('work_details').nullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLES.ORDER_PRINTER_COUNTER, t => {
        t.dropColumn('work_details')
    })
}

