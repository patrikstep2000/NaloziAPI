import { NextFunction, Request, Response } from "express";
import { createOrderSchema, updateOrderSchema } from "../schemas/OrderSchema";
import { createClientSchema, updateClientSchema } from "../schemas/ClientSchema";
import { updatePrinterSchema, createPrinterSchema } from "../schemas/PrinterSchema";
import { createUserSchema, updateUserSchema } from "../schemas/UserSchema";
import { idSchema } from "../schemas/BaseSchema";

const validateId = (req: Request, res: Response, next: NextFunction) => {
    const result = idSchema.validate(req.params);
    if (result.error) throw new Error("Invalid param");
    next();
}

export const validateUpdateOrderBody = (req: Request, res: Response, next: NextFunction) => {
    const result = updateOrderSchema.validate(req.body);
    if (result.error) throw new Error("Invalid body" + result.error.message);
    next();
}

export const validateCreateOrderBody = (req: Request, res: Response, next: NextFunction) => {
    const result = createOrderSchema.validate(req.body);
    if(result.error) throw new Error("Invalid body" + result.error.message);
    next();
}

export const validateCreateClientBody = (req:Request,res:Response, next: NextFunction) =>{
    const result = createClientSchema.validate(req.body);
    if(result.error) throw new Error("Invalid body" + result.error.message);
    next();
}

export const validateUpdateClientBody = (req:Request,res:Response,next:NextFunction)=>{
    const result = updateClientSchema.validate(req.body);
    if(result.error) throw new Error("Invalid body" + result.error.message);
    next();
}

export const validateCreateUserBody = (req:Request, res:Response, next:NextFunction)=>{
    const result = createUserSchema.validate(req.body);
    if(result.error) throw new Error("Invalid body" + result.error.message);
    next();
}

export const validateUpdateUserBody = (req:Request, res:Response, next:NextFunction)=>{
    const result = updateUserSchema.validate(req.body);
    if(result.error) throw new Error("Invalid body" + result.error.message);
    next();
}


export const validateUpdatePrinterBody = (req:Request, res:Response, next:NextFunction)=>{
    const result = updatePrinterSchema.validate(req.body);
    if(result.error) throw new Error("Invalid body" + result.error.message);
    next();
}

export const validateCreatePrinterBody = (req:Request,res:Response,next:NextFunction)=>{
    const result = createPrinterSchema.validate(req.body);
    if(result.error) throw new Error("Invalid body" + result.error.message);
    next();
}

export default validateId;

