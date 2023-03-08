import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex("counter").insert([
        { created_at: "2022-08-07", bw_prints: "105240", color_prints: "5048", scans: "4680", printer_id: 1 },
        { created_at: "2022-08-07", bw_prints: "5086", color_prints: "35012", printer_id: 3 },
        { created_at: "2022-08-07", bw_prints: "253040", color_prints: "2343", unregistered_printer_id: 1 },
        { created_at: "2022-08-07", bw_prints: "34532", unregistered_printer_id: 2 }
    ]);
};
