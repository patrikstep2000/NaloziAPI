import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("order_material").insert([
        { details: "-", amount:1, order_id:1, material_id:1},
        { details: "-", amount:1, order_id:1, material_id:2},
        { details: "-", amount:10, order_id:2, material_id:1 },
        { details: "-", amount:3, order_id:2, material_id:2 },
        { details: "-", amount:2, order_id:3, material_id:1 },
        { details: "-", amount:6, order_id:3, material_id:2 }
    ]);
};
