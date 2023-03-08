import Joi from "joi";

export const idSchema = Joi.object({
    id: Joi.number().positive().integer()
})

export const simpleIdSchema = Joi.number().positive().integer() 