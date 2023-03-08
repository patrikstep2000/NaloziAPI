import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex(TABLES.TICKET_PRINTER).insert([
        { ticket_id: 1, printer_id: 1 },
        { ticket_id: 1, unregistered_printer_id: 1},
        { ticket_id: 2, printer_id: 3 },
        { ticket_id: 2, printer_id: 3 },
        { ticket_id: 3, unregistered_printer_id: 2 },
    ]);
};
