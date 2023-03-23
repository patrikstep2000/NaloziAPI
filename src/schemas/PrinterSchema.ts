import Joi from "joi";
import { simpleIdSchema } from "./BaseSchema";
import { counterSchema } from "./CounterSchema";
import { orderMaterialSchema } from "./MaterialSchema";

export const simplePrinterSchema = Joi.object({
    id: simpleIdSchema.required()
}).unknown(true)

export const createPrinterSchema = Joi.object({
    serial_number:Joi.string().required(),
    details:Joi.string().required(),
    model_id:Joi.number().integer().positive().required(),
    status_id:Joi.number().integer().positive().required()
})

export const updatePrinterSchema = Joi.object({
    serial_number:Joi.string().optional(),
    details:Joi.string().optional(),
    model_id:Joi.number().integer().positive().optional(),
    status_id:Joi.number().integer().positive().optional(),
    client_id:Joi.number().integer().positive().optional(),
}).unknown(true)

export const unregisteredPrinterSchema = Joi.object({
    model: Joi.string().required(),
    serial_number: Joi.string().required(),
    details: Joi.string().optional().allow(null)
}).unknown(true)

export const orderPrinterSchema = Joi.object({
    printer: simplePrinterSchema.required(),
    work_details:Joi.string().optional().allow(null, ""),
    counter: counterSchema.optional(),
    material: Joi.array().items(orderMaterialSchema).optional()
}).unknown(true)

export const orderUnregisteredPrinterSchema = Joi.object({
    printer: unregisteredPrinterSchema.required(),
    work_details:Joi.string().optional().allow(null, ""),
    counter: counterSchema.optional(),
    material: Joi.array().items(orderMaterialSchema).optional()
}).unknown(true)