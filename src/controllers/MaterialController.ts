import { Request, Response } from "express";
import MaterialRepo from "../repo/MaterialRepo";

class MaterialController{

    public static getAllMaterials = async(req:Request, res:Response)=>{
        try {
            let materials = await MaterialRepo.getAllMaterials(req);
            res.status(200).json(materials);
        } catch (error) {
            res.status(400).json({success:false, error})   
        }
    }
}

export default MaterialController