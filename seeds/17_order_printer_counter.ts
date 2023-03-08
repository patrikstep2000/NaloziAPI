import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("order_printer_counter").insert([
        { order_id: 1, printer_id: 1, counter_id: 1 },
        { order_id: 2, printer_id: 3, counter_id: 2 },
        { order_id: 3, unregistered_printer_id: 1, counter_id: 3 },
        { order_id: 4, unregistered_printer_id: 2, counter_id: 4 }
    ]);
};
