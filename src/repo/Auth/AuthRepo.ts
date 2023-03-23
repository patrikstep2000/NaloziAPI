import CryptoJS from "crypto-js";
import crypto from "crypto";
import { TABLES } from "../../constants/Enums";
import db from "../../knexfile";
import UserType from "../../models/User/User";

class AuthRepo {
  static decrypt(ciphertext: string) {
    return CryptoJS.AES.decrypt(
      ciphertext,
      process.env.ENCRYPTION_SECRET as string
    ).toString(CryptoJS.enc.Utf8);
  }
  public static encrypt = (value: string): string => {
    return CryptoJS.AES.encrypt(
      value,
      process.env.ENCRYPTION_SECRET as string
    ).toString();
  };

  public static generateResetCode = (id: number): string => {
    const reset_code = crypto.randomBytes(20).toString();
    return AuthRepo.encrypt(reset_code);
  };

  public static getUserByResetCode = async (
    resetCode: string
  ): Promise<UserType> => {
    return db(TABLES.PASSWORD_RESET + " as om")
      .select("*")
      .join("user as u", "om.UserID", "=", "u.id")
      .where("om.reset_code", resetCode)
      .first();
  };

  public static saveResetCode(reset_code: string, UserID: number) {
    return db(TABLES.PASSWORD_RESET).insert({ reset_code, UserID });
  }

  static deleteResetCode(UserID: number) {
    return db(TABLES.PASSWORD_RESET).del().where({ UserID });
  }
  static setNewPassword(password: string, id: number) {
    return db(TABLES.USER).update({ password }).where({ id });
  }
}

export default AuthRepo;
