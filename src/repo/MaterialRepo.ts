import { Request } from "express";
import { IWithPagination } from "knex-paginate";
import { TABLES } from "../constants/Enums";
import { MaterialFilters } from "../constants/Filter";
import { MaterialHelpers } from "../database/DBHelperFunctions.ts/MaterialHelpers";
import {
  DBMaterialType,
  DBOrderMaterialType,
} from "../database/DBModels/DBMaterial";
import {
  DBMaterialsSelect,
  DBOrderMaterialSelect,
  DBOrderPrinterMaterialSelect,
} from "../database/DBSelects/DBMaterialSelects";
import db from "../knexfile";
import MaterialType from "../models/Material/MaterialType";
import OrderMaterialType from "../models/Material/OrderMaterial";
import { FilterHelpers, PaginateHelpers } from "../utils/Helpers";

class MaterialRepo {
  public static getOrderPrinterMaterialByOrderAndPrinterId = async (
    order_id: string,
    printer_id: string
  ): Promise<Partial<OrderMaterialType>[]> => {
    return db(TABLES.ORDER_PRINTER_MATERIAL + " as opm")
      .select(DBOrderPrinterMaterialSelect)
      .join("material as m", "m.id", "=", "opm.material_id")
      .join("material_type as mt", "mt.id", "=", "m.type_id")
      .whereNotNull("opm.printer_id")
      .andWhere("opm.order_id", order_id)
      .andWhere("opm.printer_id", printer_id)
      .then((data: DBOrderMaterialType[]) => {
        return data.map((material: DBOrderMaterialType) =>
          MaterialHelpers.createOrderMaterial(material)
        );
      });
  };

  public static getOrderUnregisteredPrinterMaterialByOrderAndPrinterId = async (
    order_id: string,
    printer_id: string
  ): Promise<Partial<OrderMaterialType>[]> => {
    return db(TABLES.ORDER_PRINTER_MATERIAL + " as opm")
      .select(DBOrderPrinterMaterialSelect)
      .join("material as m", "m.id", "=", "opm.material_id")
      .join("material_type as mt", "mt.id", "=", "m.type_id")
      .whereNotNull("opm.unregistered_printer_id")
      .andWhere("opm.order_id", order_id)
      .andWhere("opm.unregistered_printer_id", printer_id)
      .then((data: DBOrderMaterialType[]) => {
        return data.map((material: DBOrderMaterialType) =>
          MaterialHelpers.createOrderMaterial(material)
        );
      });
  };

  public static getOrderMaterialByOrderId = async (
    id: string
  ): Promise<Partial<OrderMaterialType>[]> => {
    return db(TABLES.ORDER_MATERIAL + " as om")
      .select(DBOrderMaterialSelect)
      .join("material as m", "m.id", "=", "om.material_id")
      .join("material_type as mt", "mt.id", "=", "m.type_id")
      .where("om.order_id", id)
      .then((data: DBOrderMaterialType[]) => {
        return data.map((material: DBOrderMaterialType) =>
          MaterialHelpers.createOrderMaterial(material)
        );
      });
  };

  public static deleteOrderMaterialByOrderId = async (
    counterId: string
  ): Promise<number> => {
    return await db(TABLES.ORDER_MATERIAL).where("order_id", counterId).del();
  };

  public static getAllMaterials = async (
    req: Request
  ): Promise<IWithPagination<MaterialType> | undefined> => {
    const { page, limit, filterBy, search } = req.query;
    const filter = filterBy ? String(filterBy) : undefined;
    const searchFilter = search ? `%${search}%` : `%`;

    const materials = db(TABLES.MATERIAL + " as m")
      .select(DBMaterialsSelect)
      .join("material_type as mt", "m.type_id", "=", "mt.id");

    if (!FilterHelpers.filter(MaterialFilters, materials, filter, searchFilter))
      return undefined;

    return materials
      .orderBy("m.id")
      .paginate(
        await PaginateHelpers.calculatePagination(Number(page), Number(limit))
      )
      .then((result: IWithPagination<DBMaterialType>) => {
        const finalData: IWithPagination<MaterialType> = {
          data: result.data.map((material) =>
            MaterialHelpers.createMaterial(material)
          ),
          pagination: result.pagination,
        };
        return finalData;
      });
  };

  public static deleteOrderPrinterMaterial = async (
    order_id: string,
    printer_id: string
  ): Promise<number> => {
    return db(TABLES.ORDER_PRINTER_MATERIAL)
      .where("order_id", order_id)
      .andWhere("printer_id", printer_id)
      .del();
  };

  public static deleteOrderUnregisteredPrinterMaterial = async (
    order_id: string,
    unregistered_printer_id: string
  ): Promise<number> => {
    return db(TABLES.ORDER_PRINTER_MATERIAL)
      .where("order_id", order_id)
      .andWhere("unregistered_printer_id", unregistered_printer_id)
      .del();
  };

  public static createOrderPrinterMaterial = async  (material: Partial<OrderMaterialType>, order_id: string, printer_id?: string, unregistered_printer_id?: string): Promise<number> => {
    return (await db(TABLES.ORDER_PRINTER_MATERIAL).insert({
      amount: material.amount,
      details: material.details,
      order_id: order_id,
      printer_id: printer_id,
      unregistered_printer_id: unregistered_printer_id,
      material_id: material.id
    }).returning('id'))[0].id;
  }

  public static createOrderMaterial = async (order_id: string, material:Partial<OrderMaterialType>): Promise<number> => {
    return (await db(TABLES.ORDER_MATERIAL).insert({
      details: material.details,
      amount: material.amount,
      order_id: order_id,
      material_id: material.material?.id
    }).returning('id'))[0].id;
  }
}

export default MaterialRepo;
