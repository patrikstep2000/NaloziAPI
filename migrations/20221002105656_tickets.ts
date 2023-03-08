import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
            .createTable('ticket', t => {
                t.increments('id').primary(),
                t.string('details').notNullable(),
                t.date('created_at').notNullable(),
                t.date('planned_solution_date').nullable(),
                t.string('unregistered_client').nullable(),

                //foreign keys
                t.integer('client_id')
                 .nullable()
                 .references('id')
                 .inTable(TABLES.CLIENT)

                t.integer('user_id')
                 .nullable()
                 .references('id')
                 .inTable(TABLES.USER)
            })
            .createTable('ticket_printer', t => {
                t.increments('id').primary(),
                t.string('unregistered_printer').nullable()

                //foreign keys
                t.integer('ticket_id')
                 .notNullable()
                 .references('id')
                 .inTable('ticket')

                t.integer('printer_id')
                 .nullable()
                 .references('id')
                 .inTable(TABLES.PRINTER)
            })
            .alterTable(TABLES.COUNTER, t => {
                t.string('unregistered_printer').nullable(),

                t.dropForeign('printer_id')
                t.integer('printer_id')
                 .alter()
                 .nullable()
                 .references('id')
                 .inTable(TABLES.PRINTER)
            })
            .alterTable(TABLES.ORDER_PRINTER_COUNTER, t => {
                t.string('unregistered_printer').nullable()
            })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('ticket_printer')
                    .dropTable('ticket')
}

