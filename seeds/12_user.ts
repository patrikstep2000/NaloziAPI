import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("user").insert([
        { first_name: "Patrik", last_name: "Stepanic", email: "patrik@bestcopy.hr", password:'12345', role_id: 2, deleted_at:null },
        { first_name: "Pero", last_name: "Peric", email: "pero@bestcopy.hr", password:'12345', role_id: 2, deleted_at:null }
    ]);
};
