import { Request, Response } from "express";
import { GenericErrors } from "../constants/Error";
import TicketRepo from "../repo/TicketRepo";
import AuthRepo from "../repo/AuthRepo";
import UserType from "../models/User/User";

class TicketController {
  public static getTickets = async (req: Request, res: Response) => {
    try {
      const tickets = await TicketRepo.getTickets(req);
      res.status(200).json(tickets);
    } catch (e) {
      console.error(e);
      res.status(400).send(GenericErrors.ERROR_CONNECTING_TO_DB);
    }
  };

  public static getTicket = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const ticket = await TicketRepo.getTicket(id);
      res.status(200).json(ticket);
    } catch (e) {
      console.error(e);
      res.status(400).send(GenericErrors.ERROR_CONNECTING_TO_DB);
    }
  };

  public static takeTicket = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const token = req.cookies["token"];
      if (token) {
        const user = AuthRepo.decodeJwt(token) as UserType;
        TicketRepo.takeTicket(String(user.id), id);
        res.sendStatus(200);
        return;
      }
      res.sendStatus(403);
    } catch (e) {
      res.sendStatus(500);
    }
  };
}

export default TicketController;
