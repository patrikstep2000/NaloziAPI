import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("order_status").insert([
        { name: "Potpisan" },
        { name: "Otvoren" }
    ]);
};
