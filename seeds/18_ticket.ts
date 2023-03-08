import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";

export async function seed(knex: Knex): Promise<void> {

    // Inserts seed entries
    await knex(TABLES.TICKET).insert([
        { details:'AG04 Innovative Solutions imaju KMC224e - šteka im papir u ladici', created_at:'2022-10-02', planned_solution_date: '2022-10-03', client_id:1, user_id:1 },
        { details:'AG04 Innovative Solutions imaju KMC224e - baca grešku C2557', created_at:'2022-10-02', client_id:1 },
        { details:'Best copy d.o.o. - baca grešku C0202', created_at:'2022-10-02', unregistered_client_id: 1, planned_solution_date: '2022-10-03' }
    ]);
};
