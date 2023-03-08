import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("material").insert([
        { name: "Gumice Konica/Ineo", type_id:2 },
        { name: "Gumice Canon", type_id:2 }
    ]);
};
