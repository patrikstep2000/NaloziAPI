import express from 'express'
import ClientController from '../controllers/ClientController';
import validateId from '../validators/BaseValidators';
import { validateCreateClientBody,validateUpdateClientBody } from '../validators/BaseValidators';

const router = express.Router()

router.post("/client", validateCreateClientBody, ClientController.createClient);

router.get("/client/:id", ClientController.getClientById);

router.get("/clients", ClientController.getClients);

router.patch("/client/:id", validateId, validateUpdateClientBody, ClientController.updateClientById)

export default router;