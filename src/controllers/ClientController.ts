import { Request, Response } from "express";
import { GenericErrors } from "../constants/Error";
import ClientType from "../models/Client/Client";
import ClientRepo from "../repo/ClientRepo";

class ClientController{
    public static createClient= async (req: Request, res: Response) =>  {
        try{
            const payload : ClientType = req.body
            if(!payload){
                res.status(500).send(GenericErrors.ERROR_CONNECTING_TO_DB)
            }
            const client = await ClientRepo.createClient(payload);  
            res.status(201).json(client)
        }
        catch{
            res.status(400).send(GenericErrors.ERROR_CONNECTING_TO_DB);    
        }
    }

    public static getClientById = async(req:Request,res:Response)=>{
        const {id} = req.params;
        const client = await ClientRepo.getClientById(id);
        if(!client){
            res.status(400).json({success:false})
        }
        res.status(200).json(client)
    }

    public static getClients = async(req:Request,res:Response)=>{
        try {
            let clients = await ClientRepo.getClients(req);
            res.status(200).json(clients);
        } catch (error) {
            res.status(400).json({success:false, msg:GenericErrors.ERROR_CONNECTING_TO_DB})   
        }
    }

    public static updateClientById = async(req:Request,res:Response)=>{
        try {
            const { id } = req.params;
            const payload = req.body;
            const client = await ClientRepo.updateClientById(id, payload);
            res.status(200).json(client);
        } catch (error) {
            res.status(500).json({success:false, msg:GenericErrors.ERROR_CONNECTING_TO_DB})
        }
    }
}

export default ClientController