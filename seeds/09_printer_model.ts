import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("printer_model").insert([
        { name: "C224e", printer_brand_id: 1, type_id: 2 },
        { name: "MF5940dn", printer_brand_id: 2, type_id: 1 },
        { name: "WX703", printer_brand_id: 3, type_id: 1 }
    ]);
};
