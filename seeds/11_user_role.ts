import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("user_role").insert([
        { name: "Serviser" },
        { name: "Administrator" }
    ]);
};
