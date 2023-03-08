import Joi from "joi";
import { GenericErrors } from "../constants/Error";
import { simpleClientSchema, unregisteredClientSchema } from "./ClientSchema";
import { orderMaterialSchema } from "./MaterialSchema";
import { orderPrinterSchema, orderUnregisteredPrinterSchema, simplePrinterSchema, unregisteredPrinterSchema } from "./PrinterSchema";
import { simpleUserSchema } from "./UserSchema";

const orderStatusSchema = Joi.object({
    id: Joi.number().integer().positive().custom((val:number)=>{
        if([1,2].includes(val)){
            return val;
        }
        throw new Error(GenericErrors.ORDER_STATUS_DOESNT_EXISTS);
    }).required()
}).unknown(true)

export const updateOrderSchema = Joi.object({
    work_details: Joi.string().optional(),
    closed_at: Joi.date().optional(),
    status: orderStatusSchema.optional(),
    printers: Joi.array().items(orderPrinterSchema).optional(),
    material: Joi.array().items(orderMaterialSchema).optional(),
    unregistered_printers: Joi.array().items(orderUnregisteredPrinterSchema).optional(),
    signed_name: Joi.string().regex(/^[a-zA-Zčćđžš\s]{2,35}$/).optional(),
    signature: Joi.string().optional().allow(null, "")
}).unknown(true)

export const createOrderSchema = Joi.object({
    user: simpleUserSchema.required(),
    client: simpleClientSchema.optional(),
    unregistered_client: unregisteredClientSchema.optional(),
    printers: Joi.array().items(orderPrinterSchema).optional().when('unregistered_client', {not: undefined, then: Joi.forbidden()}),
    unregistered_printers: Joi.array().items(orderUnregisteredPrinterSchema).optional()
}).xor('client', 'unregistered_client')