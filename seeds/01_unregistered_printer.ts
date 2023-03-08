import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("unregistered_printer").insert([
        { model: 'Konica Minolta C224e', serial_number: 'AAJP0023897', details: '3. kat', unregistered_client_id:1 },
        { model: 'Canon MF5940dn', serial_number: 'MKRA78263J', details: 'Žuta zgrada, 2. kat', client_id:1 }
    ]);
};