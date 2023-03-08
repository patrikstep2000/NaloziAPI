
import UserType from "../../models/User/User";
import { DBUserType } from "../DBModels/DBUser";

export class UserHelpers {
    public static createUser = (data: DBUserType): Partial<UserType> => {
      return {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        role: {
          id: data.role_id,
          name: data.role_name,
        },
      };
    };
  }