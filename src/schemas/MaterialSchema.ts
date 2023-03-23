import Joi from "joi";
import { simpleIdSchema } from "./BaseSchema";

export const simpleMaterialSchema = Joi.object({
    id: simpleIdSchema.required()
}).unknown(true)

export const orderMaterialSchema = Joi.object({
    details: Joi.string().optional().allow(null),
    amount: Joi.number().required(),
    material: simpleMaterialSchema.required()
}).unknown(true)