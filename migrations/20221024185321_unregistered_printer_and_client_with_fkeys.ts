import { Knex } from "knex";
import { TABLES } from "../src/constants/Enums";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('unregistered_client', t => {
            t.increments('id').primary(),
            t.string('name').notNullable(),
            t.string('location').nullable()
        })
        .createTable('unregistered_printer', t => {
            t.increments('id').primary(),
            t.string('model').notNullable(),
            t.string('serial_number').notNullable(),
            t.string('details').nullable(),
            t.integer('client_id')
             .nullable()
             .references('id')
             .inTable('client')
            t.integer('unregistered_client_id')
             .nullable()
             .references('id')
             .inTable('unregistered_client')
        })
        .alterTable('ticket', t => {
            t.dropColumn('unregistered_client')
            t.integer('unregistered_client_id')
             .nullable()
             .references('id')
             .inTable('unregistered_client')
        })
        .alterTable('ticket_printer', t => {
            t.dropColumn('unregistered_printer')
            t.integer('unregistered_printer_id')
             .nullable()
             .references('id')
             .inTable('unregistered_printer')
        })
        .alterTable('counter', t => {
            t.dropColumn('unregistered_printer')
            t.integer('unregistered_printer_id')
             .nullable()
             .references('id')
             .inTable('unregistered_printer')
        })
        .alterTable(TABLES.ORDER_PRINTER_COUNTER, t => {
            t.dropColumn('unregistered_printer')
            t.integer('unregistered_printer_id')
             .nullable()
             .references('id')
             .inTable('unregistered_printer')
        })
        .alterTable(TABLES.ORDER, t => {
            t.integer('unregistered_client_id')
             .nullable()
             .references('id')
             .inTable('unregistered_client')
        })
        .alterTable("unregistered_client", t => {
            t.point("location").alter()
            t.string("address")
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable('ticket', t => {
            t.dropColumn('unregistered_client_id')
        })
        .alterTable('ticket_printer', t => {
            t.dropColumn('unregistered_printer_id')
        })
        .alterTable('counter', t => {
            t.dropColumn('unregistered_printer_id')
        })
        .alterTable(TABLES.ORDER_PRINTER_COUNTER, t=> {
            t.dropColumn('unregistered_printer_id')
        })
        .alterTable(TABLES.ORDER, t=> {
            t.dropColumn('unregistered_client_id')
        })
        .dropTable('unregistered_printer')
        .dropTable('unregistered_client')
}

