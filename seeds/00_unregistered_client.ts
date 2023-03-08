import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex('unregistered_client').insert([
        { name: 'Best copy d.o.o.', location: "(45.80366203329453, 15.953735273649361)", address: 'Horvaćanska cesta 31, Zagreb' },
    ]);
};