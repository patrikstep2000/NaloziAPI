import Joi from "joi";
import { GenericErrors } from "../constants/Error";
import { simpleIdSchema } from "./BaseSchema";

export const createUserSchema = Joi.object({
    first_name:Joi.string().regex(/^[a-zA-Zčćđžš]{2,35}$/).required(),
    last_name:Joi.string().regex(/^[a-zA-Zčćđžš]{2,35}$/).required(),
    email:Joi.string().email().required(),
    password:Joi.string().optional(),
    role_id:Joi.number().integer().positive().custom((val:number)=>{
        if([1,2].includes(val)){
            return val;
        }
        throw new Error(GenericErrors.ERROR_WRONG_ROLE_ID);
    }).required()
})

export const updateUserSchema = Joi.object({
    first_name:Joi.string().regex(/^[a-zA-Zčćđžš]{2,35}$/).optional(),
    last_name:Joi.string().regex(/^[a-zA-Zčćđžš]{2,35}$/).optional(),
    email:Joi.string().email().optional(),
    password:Joi.string().optional(),
    role_id:Joi.number().integer().positive().custom((val:number)=>{
        if([1,2].includes(val)){
            return val;
        }
        throw new Error(GenericErrors.ERROR_WRONG_ROLE_ID);
    }).optional()
}).unknown(true)

export const simpleUserSchema = Joi.object({
    id: simpleIdSchema.required()
}).unknown(true)