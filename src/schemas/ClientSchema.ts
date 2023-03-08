import Joi from "joi";
import { simpleIdSchema } from "./BaseSchema";

export const createClientSchema = Joi.object({
    name:Joi.string().required(),
    oib:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    erp:Joi.string().pattern(/^[0-9]+$/).required(),
    address:Joi.string().required(),
    post_code:Joi.number().positive().required(),
    city:Joi.string().required(),
    country:Joi.string().required(),
    location:Joi.string().optional()
})

export const updateClientSchema = Joi.object({
    name:Joi.string().optional(),
    oib:Joi.string().length(11).pattern(/^[0-9]+$/).optional(),
    erp:Joi.string().pattern(/^[0-9]+$/).optional(),
    address:Joi.string().optional(),
    post_code:Joi.number().positive().optional(),
    city:Joi.string().optional(),
    country:Joi.string().optional(),
    location:Joi.string().optional()
})

export const simpleClientSchema = Joi.object({
    id: simpleIdSchema.required()
}).unknown(true)

export const unregisteredClientSchema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().optional(),
    address: Joi.string().optional()
}).unknown(true)