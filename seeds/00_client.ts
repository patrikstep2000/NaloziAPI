import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("client").insert([
        { name: "AG04 Innovative Solutions", erp: 2523, oib:"3284790", address: "Zvonimirova 69", post_code: 10_000, city:"Zagreb", country:"Hrvatska", location: "(45.80366203329453, 15.953735273649361)" },
    ]);
};