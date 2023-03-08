import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLES.CLIENT, t => {
            t.point("location").nullable()
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLES.CLIENT, t => {
            t.dropColumn("location")
        })
}

