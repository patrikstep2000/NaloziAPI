import express from 'express'
import TicketController from '../controllers/TicketController';
import validateId from '../validators/BaseValidators';

const router = express.Router();

router.get("/tickets", TicketController.getTickets);
router.get("/ticket/:id", validateId, TicketController.getTicket);
router.patch("/ticket/take/:id", validateId, TicketController.takeTicket);

export default router;