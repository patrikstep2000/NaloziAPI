import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("printer").insert([
        { serial_number: "A5C02105645", details: "-", model_id: 1, status_id: 1, client_id: 1 },
        { serial_number: "NHLA546", details: "-", model_id: 2, status_id: 1, client_id: 1 },
        { serial_number: "KHD9809", details: "-", model_id: 3, status_id: 1, client_id: 1 },
        { serial_number: "A29028023", details: "-", model_id: 1, status_id: 1, client_id: 1 },
        { serial_number: "MKRA7826", details: "-", model_id: 2, status_id: 1, client_id: 1 }
    ]);
};
