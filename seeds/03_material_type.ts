import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("material_type").insert([
        { name: "Materijal" },
        { name: "Dijelovi" }
    ]);
};