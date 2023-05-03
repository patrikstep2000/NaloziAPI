import { Request, Response } from "express";
import { GenericErrors } from "../constants/Error";
import UserType from "../models/User/User";
import UserRepo from "../repo/UserRepo";
import { MailerHelpers } from "../utils/MailerHelpers";

class UserController{
    
    public static createUser = async(req:Request, res:Response)=>{
        try {

            let payload = req.body;
            payload = {password:"", ...payload};
            const [user] = await UserRepo.createUser(payload)
            await MailerHelpers.sendOnboardingEmail(user.id, user.email);
            res.status(200).json(user)
        } 
        catch(e) {
        res.status(400).json(GenericErrors.ERROR_CONNECTING_TO_DB)
        }
    }

    public static updateUser = async(req:Request, res:Response)=>{
        try {
        const {id} = req.params
        const payload = req.body
        const user = await UserRepo.updateUser(id,payload)
        res.status(200).json(user)
        } 
        catch {
        res.status(400).json(GenericErrors.ERROR_CONNECTING_TO_DB)  
        }
    }

    public static getUsers = async(req:Request, res:Response)=>{
        try {
            let users = await UserRepo.getUsers(req);
            res.status(200).json(users);
        }
        catch {
            res.status(400).send(GenericErrors.ERROR_CONNECTING_TO_DB);
        }
    }

    public static getUser = async(req:Request, res:Response)=>{
        try {
            const {id} = req.params;
            let user = await UserRepo.getUser(id);
            res.status(200).json(user);
        }
        catch {
            res.status(400).send(GenericErrors.ERROR_CONNECTING_TO_DB);
        }
    }

    ///***deleteUser updates data in user table to be anonymous***///

    public static deleteUser = async(req:Request, res:Response)=>{
        try{
            var deletedDateTime = new Date();
            var deletedUserParams : Partial<UserType> = {first_name: "null", last_name: "null", email: "null", password:'null',deleted_at:deletedDateTime};
            const { id } = req.params;
    
            let user = await UserRepo.getUser(id);
            await UserRepo.insertOldUser(user)
            user = await UserRepo.updateUser(id, deletedUserParams);
            res.sendStatus(200)
        }
        catch{
            res.status(400).send(GenericErrors.ERROR_CONNECTING_TO_DB);
        }
    }

}

export default UserController
