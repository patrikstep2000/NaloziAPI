import express from 'express'
import OrderController from '../controllers/OrderController';
import validateId, { validateCreateOrderBody, validateSignOrderBody, validateUpdateOrderBody } from '../validators/BaseValidators';

const router = express.Router();

router.get("/order/:id", validateId, OrderController.getOrderById);

router.patch("/order/:id", validateId, validateUpdateOrderBody, OrderController.updateOrderById)

router.get("/orders", OrderController.getOrders);

router.post("/order/create", validateCreateOrderBody, OrderController.createOrder);

router.post("/order/sign/:id", validateSignOrderBody, OrderController.signOrderById);

export default router;