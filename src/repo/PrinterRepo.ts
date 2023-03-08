import { Request } from "express-serve-static-core";
import { IWithPagination } from "knex-paginate";
import { TABLES } from "../constants/Enums";
import { PrinterFilters } from "../constants/Filter";
import { PrinterHelpers } from "../database/DBHelperFunctions.ts/PrinterHelpers";
import {
  DBPrinterType,
  DBOrderPrinterType,
  DBClientPrinterType,
  DBOrderUnregisteredPrinterType,
} from "../database/DBModels/DBPrinter";
import {
  DBPrinterSelect,
  DBOrderPrinterSelect,
  DBOrderUnregisteredPrinterSelect,
} from "../database/DBSelects/DBPrinterSelects";
import db from "../knexfile";
import OrderPrinterType from "../models/Printer/OrderPrinter";
import OrderUnregisteredPrinterType from "../models/Printer/OrderUnregisteredPrinter";
import PrinterType from "../models/Printer/Printer";
import UnregisteredPrinterType from "../models/Printer/UnregisteredPrinter";
import { FilterHelpers, PaginateHelpers } from "../utils/Helpers";
import CounterRepo from "./CounterRepo";
import MaterialRepo from "./MaterialRepo";

class PrinterRepo {
  public static getPrinters = async (
    req: Request
  ): Promise<IWithPagination<Partial<PrinterType>> | undefined> => {
    const { page, limit, filterBy, search } = req.query;
    const filter = filterBy ? String(filterBy) : undefined;
    const searchFilter = search ? `%${search}%` : `%`;

    const query = db(TABLES.PRINTER + " as p")
      .select(DBPrinterSelect)
      .join("printer_model as pm", "pm.id", "=", "p.model_id")
      .join("printer_brand as pb", "pb.id", "=", "pm.printer_brand_id")
      .join("printer_status as ps", "ps.id", "=", "p.status_id")
      .join("printer_status as pt", "pt.id", "=", "pm.type_id");

    if (!FilterHelpers.filter(PrinterFilters, query, filter, searchFilter))
      return undefined;

    return query
      .orderBy("p.id")
      .paginate(
        await PaginateHelpers.calculatePagination(Number(page), Number(limit))
      )
      .then((result: IWithPagination<DBPrinterType>) => {
        const finalData: IWithPagination<Partial<PrinterType>> = {
          data: result.data.map((printer) =>
            PrinterHelpers.createPrinter(printer)
          ),
          pagination: result.pagination,
        };
        return finalData;
      });
  };

  public static deletePrinterById = async (id: string): Promise<number> => {
    return db(TABLES.PRINTER)
      .where("id", id)
      .update({ deleted: true })
      .then((noOfRows) => noOfRows);
  };

  public static getOrderPrintersByOrderId = async (
    id: string
  ): Promise<Partial<OrderPrinterType>[]> => {
    return db(TABLES.ORDER_PRINTER_COUNTER + " as opc")
      .select(DBOrderPrinterSelect)
      .join("printer as p", "p.id", "=", "opc.printer_id")
      .join("printer_model as pm", "pm.id", "=", "p.model_id")
      .join("printer_brand as pb", "pb.id", "=", "pm.printer_brand_id")
      .join("printer_status as ps", "ps.id", "=", "p.status_id")
      .join("printer_type as pt", "pt.id", "=", "pm.type_id")
      .leftJoin("counter as c", "c.id", "=", "opc.counter_id")
      .whereNotNull("opc.printer_id")
      .andWhere("opc.order_id", id)
      .then((data: DBOrderPrinterType[]) => {
        return Promise.all(
          data.map(
            async (
              printer: DBOrderPrinterType
            ): Promise<Partial<OrderPrinterType>> => {
              const material =
                await MaterialRepo.getOrderPrinterMaterialByOrderAndPrinterId(
                  id,
                  String(printer.p_id)
                );
              return PrinterHelpers.createOrderPrinter(printer, material);
            }
          )
        );
      });
  };

  public static getOrderUnregisteredPrintersByOrderId = async (
    id: string
  ): Promise<Partial<OrderUnregisteredPrinterType>[]> => {
    return db(TABLES.ORDER_PRINTER_COUNTER + " as opc")
      .select(DBOrderUnregisteredPrinterSelect)
      .join(
        "unregistered_printer as up",
        "up.id",
        "=",
        "opc.unregistered_printer_id"
      )
      .leftJoin("counter as c", "c.id", "=", "opc.counter_id")
      .whereNotNull("opc.unregistered_printer_id")
      .andWhere("opc.order_id", id)
      .then((data: DBOrderUnregisteredPrinterType[]) => {
        return Promise.all(
          data.map(
            async (
              printer: DBOrderUnregisteredPrinterType
            ): Promise<Partial<OrderUnregisteredPrinterType>> => {
              const material =
                await MaterialRepo.getOrderUnregisteredPrinterMaterialByOrderAndPrinterId(
                  id,
                  String(printer.up_id)
                );
              return PrinterHelpers.createOrderUnregisteredPrinter(
                printer,
                material
              );
            }
          )
        );
      });
  };

  public static getPrintersByClientId = async (
    id: string
  ): Promise<Partial<PrinterType>[]> => {
    return db(TABLES.PRINTER + " as p")
      .select(DBPrinterSelect)
      .join("printer_model as pm", "pm.id", "=", "p.model_id")
      .join("printer_brand as pb", "pb.id", "=", "pm.printer_brand_id")
      .join("printer_status as ps", "ps.id", "=", "p.status_id")
      .join("printer_type as pt", "pt.id", "=", "pm.type_id")
      .where("p.client_id", id)
      .then((data: DBClientPrinterType[]) => {
        return data.map((printer: DBClientPrinterType) =>
          PrinterHelpers.createClientPrinter(printer)
        );
      });
  };

  public static updatePrinterById = async (
    id: string,
    payload: Partial<PrinterType>
  ): Promise<Partial<PrinterType>> => {
    return db(TABLES.PRINTER).update(payload).where("id", id).returning("id");
  };

  public static createPrinter = async (
    payload: Partial<PrinterType>
  ): Promise<Partial<PrinterType>> => {
    return db("printer").insert(payload).returning("id");
  };

  public static createUnregisteredPrinter = async (
    printer: Partial<UnregisteredPrinterType>,
    client_id?: string,
    unregistered_client_id?: string
  ): Promise<number> => {
    return (
      await db(TABLES.UNREGISTERED_PRINTER).insert({
        model: printer.model,
        serial_number: printer.serial_number,
        client_id: client_id,
        unregistered_client_id: unregistered_client_id
      }).returning("id")
    )[0].id;
  };

  public static createOrderPrinter = async (
    order_id: string,
    order_printer: Partial<OrderPrinterType>
  ): Promise<number> => {
    await MaterialRepo.deleteOrderPrinterMaterial(
      order_id,
      String(order_printer.printer?.id)
    );

    order_printer?.material?.forEach(async (m) => {
      await MaterialRepo.createOrderPrinterMaterial(
        m,
        order_id,
        String(order_printer.printer?.id)
      );
    });

    const counter_id =
      order_printer?.counter &&
      (await CounterRepo.createCounter(
        order_printer.counter,
        String(order_printer.printer?.id)
      ));

    return (
      await db(TABLES.ORDER_PRINTER_COUNTER)
        .insert({
          order_id: order_id,
          printer_id: order_printer.printer?.id,
          counter_id: counter_id,
        })
        .returning("id")
    )[0].id;
  };

  public static createOrderUnregisteredPrinter = async (
    order_id: string,
    order_printer: Partial<OrderUnregisteredPrinterType>,
    client_id?: string,
    unregistered_client_id?: string
  ): Promise<number> => {
    const printer_id = order_printer.printer && await this.createUnregisteredPrinter(order_printer.printer, client_id, unregistered_client_id)

    order_printer?.material?.forEach(async (m) => {
      await MaterialRepo.createOrderPrinterMaterial(
        m,
        order_id,
        undefined,
        String(printer_id)
      );
    });

    const counter_id =
      order_printer?.counter &&
      await CounterRepo.createCounter(
        order_printer.counter,
        String(printer_id)
      );

    return (
      await db(TABLES.ORDER_PRINTER_COUNTER)
        .insert({
          order_id: order_id,
          unregistered_printer_id: printer_id,
          counter_id: counter_id 
        })
        .returning("id")
    )[0].id;
  };
}

export default PrinterRepo;
