import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("audit",t=>{
        t.increments("id").primary(),
        t.json("table")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("audit");
}

