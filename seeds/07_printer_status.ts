import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("printer_status").insert([
        { name: "U najmu" },
        { name: "Otpis" },
        { name: "Za dijelove" },
        { name: "Na stanju" }
    ]);
};
