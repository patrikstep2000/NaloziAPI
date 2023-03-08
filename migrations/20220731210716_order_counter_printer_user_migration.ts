import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable("client", t => {
        t.increments("id").primary(),
        t.string("name").notNullable(),
        t.integer("erp").notNullable(),
        t.string("address").notNullable(),
        t.integer("post_code").notNullable(),
        t.string("city").notNullable(),
        t.string("country").notNullable(),
        t.string("oib").notNullable()
    })
    .createTable("contact", t => {
        t.increments("id").primary(),
        t.string("full_name").notNullable(),
        t.string("phone").nullable(),
        t.string("email").nullable(),
        t.string("position").nullable(),
        t.boolean("responsible").notNullable(),
        
        //foreign keys
        t.integer("client_id")
         .notNullable()
         .references("id")
         .inTable("client")
    })
    .createTable("material_type", t => {
        t.increments("id").primary(),
        t.string("name").notNullable()
    })
    .createTable("material", t => {
        t.increments("id").primary(),
        t.string("name").notNullable()

        //foreign key
        t.integer("type_id")
         .notNullable()
         .references("id")
         .inTable("material_type")
    })
    .createTable("user_role", t => {
        t.increments("id").primary(),
        t.string("name").notNullable()
    })
    .createTable("user", t => {
        t.increments("id").primary(),
        t.string("first_name").notNullable(),
        t.string("last_name").notNullable(),
        t.string("email").notNullable(),
        t.string("password").notNullable(),
        t.integer("role_id")
         .notNullable()
         .references("id")
         .inTable("user_role")
    })
    .createTable("printer_status", t => {
        t.increments("id").primary(),
        t.string("name").notNullable()
    })
    .createTable("printer_brand", t => {
        t.increments("id").primary(),
        t.string("name").notNullable()
    })
    .createTable("printer_model", t => {
        t.increments("id").primary(),
        t.string("name").notNullable(),
        t.integer("printer_brand_id")
         .notNullable()
         .references("id")
         .inTable("printer_brand")
    })
    .createTable("printer_type", t => {
        t.increments("id").primary(),
        t.string("name").notNullable()
    })
    .createTable("printer", t => {
        t.increments("id").primary(),
        t.string("serial_number").notNullable(),
        t.string("details").notNullable(),

        //foreign keys
        t.integer("model_id")
         .notNullable()
         .references("id")
         .inTable("printer_model"),
        t.integer("status_id")
         .notNullable()
         .references("id")
         .inTable("printer_status"),
        t.integer("type_id")
         .notNullable()
         .references("id")
         .inTable("printer_type")
        t.integer("client_id")
         .nullable()
         .references("id")
         .inTable("client")
    })
    .createTable("order_status", t => {
        t.increments("id").primary(),
        t.string("name").notNullable()
    })
    .createTable("order",t=>{
        t.increments("id").primary(),

        t.string("order_number").notNullable(),
        t.string("work_details").nullable(),
        t.datetime("created_at").notNullable(),
        t.datetime("closed_at").nullable(),

        //foreign keys
        t.integer("user_id")
         .notNullable()
         .references("id")
         .inTable("user"),
        t.integer("status_id")
         .notNullable()
         .references("id")
         .inTable("order_status")
        t.integer("client_id")
         .nullable()
         .references("id")
         .inTable("client")
    })
    .createTable("counter", t => {
        t.increments("id").primary(),
        t.datetime("created_at").notNullable(),
        t.integer("bw_prints").notNullable(),
        t.integer("color_prints").nullable(),
        t.integer("scans").nullable(),

        //foreign keys
        t.integer("printer_id")
         .notNullable()
         .references("id")
         .inTable("printer")
    })
    .createTable("order_material", t => {
        t.increments("id").primary(),
        t.string("details").nullable(),
        t.integer("amount").notNullable(),

        //foreign keys
        t.integer("order_id")
         .notNullable()
         .references("id")
         .inTable("order"),
        t.integer("material_id")
         .notNullable()
         .references("id")
         .inTable("material")
    })
    .createTable("order_printer_counter", t => {
        t.increments("id").primary(),

        //foreign keys
        t.integer("order_id")
         .notNullable()
         .references("id")
         .inTable("order"),
        t.integer("printer_id")
         .nullable()
         .references("id")
         .inTable("printer"),
        t.integer("counter_id")
         .nullable()
         .references("id")
         .inTable("counter")
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTable("order_printer_counter")
    .dropTable("order_material")
    .dropTable("counter")
    .dropTable("order")
    .dropTable("order_status")
    .dropTable("printer")
    .dropTable("printer_type")
    .dropTable("printer_model")
    .dropTable("printer_brand")
    .dropTable("printer_status")
    .dropTable("user")
    .dropTable("user_role")
    .dropTable("material")
    .dropTable("material_type")
    .dropTable("contact")
    .dropTable("client")
}

