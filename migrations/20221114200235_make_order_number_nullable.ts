import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TABLES.ORDER, t => {
        t.string('order_number').nullable().alter()
    })
}


export async function down(knex: Knex): Promise<void> {
}

