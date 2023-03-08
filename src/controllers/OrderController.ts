import { Request, Response } from "express";
import { GenericErrors } from "../constants/Error";
import OrderRepo from "../repo/OrderRepo";
import OrderType from "../models/Order/Order";

class OrderController {

    public static createOrder = async (req: Request, res: Response) => {
        try{
            const payload : OrderType = req.body
            if(!payload){
                res.status(400).json({success:false})
            }
            const order = await OrderRepo.createOrder(payload);   
            res.status(201).json(order);
        }
        catch{
            res.status(400).send(GenericErrors.ERROR_CONNECTING_TO_DB);    
        }
    }

    public static getOrderById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const order = await OrderRepo.getOrderById(id);
        if (!order) {
            res.status(400).send(GenericErrors.ERROR_CONNECTING_TO_DB);
        }
        res.status(200).json(order);
    }

    public static updateOrderById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            const order = await OrderRepo.updateOrderById(id, payload);
            res.status(200).json(order);
        } catch {
            res.status(500).send(GenericErrors.ERROR_CONNECTING_TO_DB)  
        }
    }

    public static getOrders = async (req: Request, res: Response) => {
        try {
            let orders = await OrderRepo.getOrders(req);
            res.status(200).json(orders);
        }
        catch {
            res.status(400).send(GenericErrors.ERROR_CONNECTING_TO_DB);
        }
    }
}

export default OrderController;