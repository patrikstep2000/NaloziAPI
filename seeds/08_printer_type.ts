import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("printer_type").insert([
        { name: "CB" },
        { name: "Boja" }
    ]);
};
