import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("printer_brand").insert([
        { name: "Konica Minolta" },
        { name: "Canon" },
        { name: "Epson" }
    ]);
};
