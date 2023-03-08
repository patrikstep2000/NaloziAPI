import { Request, Response } from "express";
import { GenericErrors } from "../constants/Error";
import PrinterRepo from "../repo/PrinterRepo";

class PrinterController{

    public static getPrinters = async (req:Request, res:Response) =>{
        try {
            let printers = await PrinterRepo.getPrinters(req);
            res.status(200).json(printers);
        }
        catch {
            res.status(400).send(GenericErrors.ERROR_CONNECTING_TO_DB);
        }
    }

    public static deletePrinterById = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const printer = await PrinterRepo.deletePrinterById(id);
            res.status(200).json({ deletedPrintersCount: printer });
        }
        catch{
            res.status(400).json(GenericErrors.ERROR_CONNECTING_TO_DB)  
        }
    }

    public static getPrintersByClientId = async (req: Request, res: Response) => {
        try{
            const { id } = req.params;
            const printers = await PrinterRepo.getPrintersByClientId(id);
            res.status(200).json(printers);
        }
        catch{
            res.status(400).json(GenericErrors.ERROR_CONNECTING_TO_DB)
        }
    }

    public static createPrinter = async (req:Request, res:Response) => {
        try {
            const payload = req.body
            const printer = await PrinterRepo.createPrinter(payload);
            res.status(200).json(printer)
        } catch {
            res.status(400).json(GenericErrors.ERROR_CONNECTING_TO_DB)
        }
    }
    
    public static updatePrinter = async (req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const payload = req.body;
            const printer = await PrinterRepo.updatePrinterById(id, payload);
            return res.status(200).json(printer);
        } 
        catch {
            res.send(400).json(GenericErrors.ERROR_CONNECTING_TO_DB)
        }
    }

}

export default PrinterController