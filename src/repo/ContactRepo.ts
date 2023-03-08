import { DBContactSelect } from "../database/DBSelects/DBContactSelects";
import db from "../knexfile";
import ContactType from "../models/Client/Contact";

class ContactRepo{
    public static getContactsByClientId = async (id:string) : Promise<Partial<ContactType>[]> =>{
        return db( "contact as c").select(DBContactSelect)
        .where("c.client_id",id).then((data:Partial<ContactType>[])=>{
            return data;
        })
    }
}

export default ContactRepo;