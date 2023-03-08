import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('order_printer_material', t => {
            t.increments('id').primary()
            t.integer('amount').notNullable()
            t.string('details').nullable()

            
            t.integer('order_id')
             .notNullable()
             .references('id')
             .inTable('order')
            t.integer('printer_id')
             .nullable()
             .references('id')
             .inTable('printer')
            t.integer('unregistered_printer_id')
             .nullable()
             .references('id')
             .inTable('unregistered_printer')
            t.integer('material_id')
             .notNullable()
             .references('id')
             .inTable('material')
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable('order_printer_material')
}

