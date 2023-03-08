import Joi from "joi";

export const counterSchema = Joi.object({
    bw_prints: Joi.number().positive().required(),
    color_prints: Joi.number().positive().optional().allow(null),
    scans: Joi.number().positive().optional().allow(null)
}).unknown(true)