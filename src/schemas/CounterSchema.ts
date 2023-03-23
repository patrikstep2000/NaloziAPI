import Joi from "joi";

export const counterSchema = Joi.object({
    bw_prints: Joi.number().min(0).required().allow(null),
    color_prints: Joi.number().min(0).optional().allow(null),
    scans: Joi.number().min(0).optional().allow(null)
}).unknown(true)