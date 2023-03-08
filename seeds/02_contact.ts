import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("contact").insert([
        { full_name:"Josip Prekrat", phone:"091172623", position:"Član društva", responsible:true, client_id:1 },
    ]);
};