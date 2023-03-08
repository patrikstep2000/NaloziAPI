import { Request } from "express";
import { IWithPagination } from "knex-paginate";
import { TABLES } from "../constants/Enums";
import { ClientFilters } from "../constants/Filter";
import { ClientHelpers } from "../database/DBHelperFunctions.ts/ClientHelpers";
import { DBOrderType } from "../database/DBModels/DBOrder";
import { DBClientSelect } from "../database/DBSelects/DBClientSelects";
import db from "../knexfile";
import ClientType from "../models/Client/Client";
import { FilterHelpers, PaginateHelpers } from "../utils/Helpers";
import ContactRepo from "./ContactRepo";
import PrinterRepo from "./PrinterRepo";

class ClientRepo{

    public static createClient = async (payload:ClientType) : Promise<Partial<ClientType>>=>{
        return db(TABLES.CLIENT).insert(payload).returning(['id','name','erp','address','post_code','city','country','oib','location'])
    }

    public static getClientById = async(id:string): Promise<Partial<ClientType> | undefined >=>{
        const contacts = await ContactRepo.getContactsByClientId(id);
        const printers = await PrinterRepo.getPrintersByClientId(id);
        const client = await db("client as c").select(DBClientSelect).where("c.id" ,id).first().then((data:ClientType)=>data ? ClientHelpers.createClient(data, contacts, printers):data);
        return client;
    }

    public static getClients = async(req:Request):Promise<IWithPagination<ClientType> | undefined> =>{
      const { page, limit, filterBy, search } = req.query;
      const filter = filterBy ? String(filterBy) : undefined;
      const searchFilter = search ? `%${search}%` : `%`;
      
      const query = db("client as c").select(DBClientSelect)

      if(!FilterHelpers.filter(ClientFilters, query, filter, searchFilter)) return undefined;
    
      return query
            .orderBy("c.id")
            .paginate(await PaginateHelpers.calculatePagination(Number(page), Number(limit)))
            .then((result:IWithPagination<ClientType>) => {
              return result;
            });
    }

    public static updateClientById = async(id:string, payload:Partial<ClientType>) : Promise<Partial<ClientType>> =>{
      return db("client").update(payload).where("id", id).returning(['id','name','erp','address','post_code','city','country','oib','location']);
    }  

    public static getClientIdByOrderId = async (id:string): Promise<{client_id: number, unregistered_client_id: number}> => {
      return db(TABLES.ORDER).select('client_id', 'unregistered_client_id').where('id', id).then((data:any) => {
        return {
          client_id: data.client_id,
          unregistered_client_id: data.unregistered_client_id
        }
      })
    }
}

export default ClientRepo