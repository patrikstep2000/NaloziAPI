import { IWithPagination } from "knex-paginate";
import { ORDER_STATUS, TABLES } from "../constants/Enums";
import { OrderFilters } from "../constants/Filter";
import db from "../knexfile";
import OrderType from "../models/Order/Order";
import { FilterHelpers, PaginateHelpers } from "../utils/Helpers";
import { Request } from "express";
import PrinterRepo from "./PrinterRepo";
import MaterialRepo from "./MaterialRepo";
import { DBOrderByIdSelect, DBOrdersSelect } from "../database/DBSelects/DBOrderSelects";
import { OrderHelpers } from "../database/DBHelperFunctions.ts/OrderHelpers";
import { DBOrderType } from "../database/DBModels/DBOrder";
import { DateTime } from "luxon";
import ClientRepo from "./ClientRepo";

class OrderRepo {

  public static createOrder = async (payload:OrderType) : Promise<number> => {
    const unregistered_client_id = payload.unregistered_client && (await db(TABLES.UNREGISTERED_CLIENT).insert(payload.unregistered_client).returning('id'))[0].id;

    const order_id = (await db(TABLES.ORDER).insert({
      created_at: DateTime.now().toISODate(),
      user_id: payload.user.id,
      status_id: ORDER_STATUS.OPEN,
      client_id: payload?.client?.id,
      unregistered_client_id: unregistered_client_id,
    }).returning('id'))[0].id;

    await db(TABLES.ORDER).update({order_number: `${DateTime.now().year} - ${order_id}`}).where('id', order_id)

    payload?.printers?.forEach(async (p) => {
      await PrinterRepo.createOrderPrinter(order_id, p)
    })
    payload?.unregistered_printers?.forEach(async(p) => {
      await PrinterRepo.createOrderUnregisteredPrinter(order_id, p, payload?.client?.id, unregistered_client_id)
    })

    return order_id;
  }

  public static getOrderById = async (id: string): Promise<Partial<OrderType> | undefined> => {
    const material = await MaterialRepo.getOrderMaterialByOrderId(id);
    const printers = await PrinterRepo.getOrderPrintersByOrderId(id);
    const unregistered_printers = await PrinterRepo.getOrderUnregisteredPrintersByOrderId(id);
    const order = await db(TABLES.ORDER + " as o")
      .select(DBOrderByIdSelect)
      .join("user as u", "u.id", "=", "o.user_id")
      .join("order_status as os", "os.id", "=", "o.status_id")
      .leftJoin("client as c", "c.id", "=", "o.client_id")
      .leftJoin("unregistered_client as uc", "uc.id", "=", "o.unregistered_client_id")
      .where("o.id", id).first()
      .then((data:DBOrderType) => data && OrderHelpers.createOrder(data, printers, unregistered_printers, material));
    return order;
  };

  public static getOrders = async (req: Request): Promise<IWithPagination<Partial<OrderType>> | undefined> => {
    const { page, limit, filterBy, search } = req.query;
    const filter = filterBy ? String(filterBy) : undefined;
    const searchFilter = search ? `%${search}%` : `%`;

    const query =  db(TABLES.ORDER + " as o")
      .select(DBOrdersSelect)
      .join("user as u", "u.id", "=", "o.user_id")
      .join("order_status as os", "os.id", "=", "o.status_id")
      .leftJoin("client as c", "c.id", "=", "o.client_id")
      .leftJoin("unregistered_client as uc", "uc.id", "=", "o.unregistered_client_id")

      if(!FilterHelpers.filter(OrderFilters, query, filter, searchFilter)) return undefined;

      return query
        .orderBy("o.id")
        .paginate(await PaginateHelpers.calculatePagination(Number(page), Number(limit)))
        .then((result:IWithPagination<DBOrderType>) => {
          let finalData: IWithPagination<Partial<OrderType>> = {
            data: result.data.map(order => OrderHelpers.createOrder(order)),
            pagination: result.pagination
          }
          return finalData;
        });
  }

  public static deleteOrderPrinterCounterByOrderId = async (id: string): Promise<number> => {
    return await db(TABLES.ORDER_PRINTER_COUNTER).where("order_id", id).del();
  }


  public static updateOrderById = async (id:string, payload:Partial<OrderType>):Promise<Partial<OrderType> | undefined> => {
    (payload.printers || payload.unregistered_printers) && await this.deleteOrderPrinterCounterByOrderId(id);
    payload.material && await MaterialRepo.deleteOrderMaterialByOrderId(id);

    payload?.printers?.forEach(async (p) => {
      await PrinterRepo.createOrderPrinter(id, p);
    })

    const client = payload.unregistered_printers && await ClientRepo.getClientIdByOrderId(id);
    payload?.unregistered_printers?.forEach(async (p) => {
      await PrinterRepo.createOrderUnregisteredPrinter(id, p, client?.client_id, client?.unregistered_client_id);
    })

    payload?.material?.forEach(async (m) => {
      await MaterialRepo.createOrderMaterial(id, m);
    })

    return (await db(TABLES.ORDER).update({
      work_details: payload?.work_details,
      closed_at: payload?.closed_at,
      status_id: payload?.status?.id,
      signed_name: payload?.signed_name,
      signature: payload?.signature
    }).where("id", id).returning('id'))[0].id
  }
}

export default OrderRepo;