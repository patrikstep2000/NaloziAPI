import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex('order_printer_material').insert([
        { order_id: 1, printer_id: 1, material_id: 1, amount: 2, details: '-' },
        { order_id: 1, printer_id: 1, material_id: 2, amount: 1, details: '-' },
        { order_id: 3, unregistered_printer_id: 1, material_id: 1, amount: 3, details: '-' },
        { order_id: 3, unregistered_printer_id: 1, material_id: 2, amount: 1, details: '-' },
    ]);
};
