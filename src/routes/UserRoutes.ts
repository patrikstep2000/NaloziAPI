import express from 'express'
import UserController from '../controllers/UserController';
import validateId, { validateCreateUserBody, validateUpdateUserBody } from '../validators/BaseValidators';

const router = express.Router();

router.post("/user", validateCreateUserBody, UserController.createUser);

router.patch("/user/:id", validateId, validateUpdateUserBody, UserController.updateUser);

router.get("/users", UserController.getUsers);

router.delete("/user/:id", validateId, UserController.deleteUser);

router.get("/user/:id", validateId, UserController.getUser);

export default router;