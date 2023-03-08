import sendEmail from "../Services/Mailer";
import AuthRepo from "../repo/Auth/AuthRepo";


export class MailerHelpers {
    public static sendOnboardingEmail=async (id?:number, email?:string)=>{
        if(!id || !email) throw new Error("User isn't created")
        const reset_code = AuthRepo.generateResetCode(id);
        const reset_url = `${process.env.BASE_URL_UI as string}/password/reset?key=${reset_code}`
        await AuthRepo.saveResetCode(reset_code, id);
        await sendEmail("UserOnboarding", "UserOnboarding",{href:reset_url}, email);
    }
}

