import { Request } from "express-serve-static-core";
import { IWithPagination } from "knex-paginate";
import { TABLES } from "../constants/Enums";
import { UserFilters } from "../constants/Filter";
import { UserHelpers } from "../database/DBHelperFunctions.ts/UserHelpers";
import { DBUserType } from "../database/DBModels/DBUser";
import { DBOldUserSelect, DBUserSelect } from "../database/DBSelects/DBUserSelects";
import db from "../knexfile";
import UserType from "../models/User/User";
import { FilterHelpers, PaginateHelpers } from "../utils/Helpers";

class UserRepo{

    public static createUser = async (payload:UserType) : Promise<Partial<UserType>[]> => {
        return db(TABLES.USER).insert(payload).returning(['id', 'first_name','last_name','email','role_id'])
    }

    public static updateUser = async (id:string,payload:Partial<UserType>) : Promise<Partial<UserType>> =>{
        return db(TABLES.USER).update(payload).where("id", id).returning(['id', 'first_name','last_name','email','role_id'])
    }
    
    public static getUsers = async(req:Request) => {
        const { page, limit, filterBy, search } = req.query;
        const filter = filterBy ? String(filterBy) : undefined;
        const searchFilter = search ? `%${search}%` : `%`;
  
        const query = db(TABLES.USER + " as u").select(DBUserSelect)
        .join("user_role as ur", "ur.id","=", "u.role_id")
  
        if(!FilterHelpers.filter(UserFilters, query, filter, searchFilter)) return undefined;
  
          return query
          .orderBy("u.id")
          .paginate(await PaginateHelpers.calculatePagination(Number(page), Number(limit)))
          .then((result:IWithPagination<DBUserType>) => {
            const finalData: IWithPagination<Partial<UserType>> = {
              data: result.data.map(user => UserHelpers.createUser(user)),
              pagination: result.pagination
            }
            return finalData;
          });
    }

    ///***getUser returns data for deleted_user table***///

    public static getUser = async(id:string) : Promise<Partial<UserType>> =>{
      const user = await db(TABLES.USER + " as u")
      .select(DBOldUserSelect)
      .where("u.id", id).first()
      .then()
      return user;       
    }

    ///***insertOldUser inserts data into deleted_user table***///
    
    public static insertOldUser = async (user:Partial<UserType>) :Promise<Partial<UserType>> =>{
      return db('deleted_user').insert(user).returning(['id', 'first_name','last_name','email','old_id'])
    }

}

export default UserRepo