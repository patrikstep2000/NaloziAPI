import { Request, Response } from "express";
import AuthRepo from "../repo/Auth/AuthRepo";


class AuthController {
    static ResetPassword = async (req: Request, res: Response) => {
        const {key, password} = req.body;
        try{
        const user = await AuthRepo.getUserByResetCode(key);
        await AuthRepo.setNewPassword(AuthRepo.encrypt(password), user.id);
        await AuthRepo.deleteResetCode(user.id);
        res.sendStatus(200);
    }
    catch(e){
        res.sendStatus(400)
    }
    }
    public static AuthenticateUser = async (req: Request, res: Response) =>{
        const {email, password} = req.body;
        // const user = await UserRepo.getUserByEmailAndPassword(email, AuthRepo.encrypt(password))
    }
}

export default AuthController;