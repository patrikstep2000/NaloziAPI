import express from 'express'
import AuthController from '../controllers/AuthController';

const router = express.Router()

router.post("/login", AuthController.AuthenticateUser)
router.post("/user/reset_password", AuthController.ResetPassword)

export default router;
