
import OrderMaterialType from "../../models/Material/OrderMaterial";
import OrderType from "../../models/Order/Order";
import OrderPrinterType from "../../models/Printer/OrderPrinter";
import UnregisteredPrinterType from "../../models/Printer/UnregisteredPrinter";
import { DBOrderType } from "../DBModels/DBOrder";

export class OrderHelpers {
    public static createOrder = (
      data: DBOrderType,
      printers?: Partial<OrderPrinterType>[],
      unregistered_printers?: Partial<UnregisteredPrinterType>[],
      material?: Partial<OrderMaterialType>[]
    ): Partial<OrderType> => {
      return {
        id: data.id,
        order_number: data.order_number,
        work_details: data.work_details,
        created_at: data.created_at,
        closed_at: data.closed_at,
        user: {
          id: data.u_id,
          first_name: data.u_fname,
          last_name: data.u_lname,
          email: data.u_email,
        },
        status: {
          id: data.os_id,
          name: data.os_name,
        },
        client: {
          id: data.c_id,
          name: data.c_name,
          erp: data.c_erp,
          oib: data.c_oib,
          address: data.c_address,
          post_code: data.c_post_code,
          city: data.c_city,
          country: data.c_country,
          location: data.c_location,
        },
        unregistered_client: {
          id: data.uc_id,
          name: data.uc_name,
          location: data.uc_location
        },
        material: material,
        printers: printers,
        unregistered_printers: unregistered_printers,
        signed_name: data.signed_name,
        signature: String.fromCharCode.apply(null, data.signature as any),
      };
    };
  }