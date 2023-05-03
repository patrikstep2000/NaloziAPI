
import OrderMaterialType from "../../models/Material/OrderMaterial";
import OrderPrinterType from "../../models/Printer/OrderPrinter";
import OrderUnregisteredPrinterType from "../../models/Printer/OrderUnregisteredPrinter";
import PrinterType from "../../models/Printer/Printer";
import UnregisteredPrinterType from "../../models/Printer/UnregisteredPrinter";
import { DBPrinterType, DBOrderPrinterType, DBClientPrinterType, DBOrderUnregisteredPrinterType, DBUnregisteredPrinterType } from "../DBModels/DBPrinter";

export class PrinterHelpers {
    public static createPrinter = (data: DBPrinterType): Partial<PrinterType> => {
      return {
        id: data.id,
        serial_number: data.serial_number,
        deleted: data.deleted,
        model: {
          id: data.pm_id,
          name: data.pm_name,
          printer_brand: {
            id: data.pb_id,
            name: data.pb_name,
          },
          type: {
            id: data.pt_id,
            name: data.pt_name,
          },
        },
        status: {
          id: data.ps_id,
          name: data.ps_name,
        },
      };
    };

    public static createUnregisteredPrinter = (data: DBUnregisteredPrinterType): Partial<UnregisteredPrinterType> => {
      return {
        id: data.up_id,
        serial_number: data.up_sm,
        details: data.up_details,
        model: data.up_model
      };
    };    
  
    public static createOrderPrinter = (
      data: DBOrderPrinterType,
      material?: Partial<OrderMaterialType>[]
    ): Partial<OrderPrinterType> => {
      return {
        id: data.id,
        work_details:data.work_details,
        printer: {
          id: data.p_id,
          serial_number: data.p_sm,
          details: data.p_details,
          deleted: data.p_deleted,
          model: {
            id: data.pm_id,
            name: data.pm_name,
            type: {
              id: data.pt_id,
              name: data.pt_name,
            },
            printer_brand: {
              id: data.pb_id,
              name: data.pb_name,
            },
          },
          status: {
            id: data.ps_id,
            name: data.ps_name,
          },
        },
        counter: {
          id: data.c_id,
          created_at: data.c_created_at,
          bw_prints: data.c_bw,
          color_prints: data.c_col,
          scans: data.c_scans,
        },
        material: material
      };
    };

    public static createOrderUnregisteredPrinter = (
      data: DBOrderUnregisteredPrinterType,
      material?: Partial<OrderMaterialType>[]
    ): Partial<OrderUnregisteredPrinterType> => {
      return {
        id: data.id,
        work_details:data.work_details,
        printer: {
          id: data.up_id,
          model: data.up_model,
          details: data.up_details,
          serial_number: data.up_sm
        },
        counter: {
          id: data.c_id,
          created_at: data.c_created_at,
          bw_prints: data.c_bw,
          color_prints: data.c_col,
          scans: data.c_scans,
        },
        material: material
      };
    }
  
    public static createClientPrinter = (
      data: DBClientPrinterType
    ): Partial<PrinterType> => {
      return {
        id: data.id,
        serial_number: data.serial_number,
        details: data.details,
        deleted: data.deleted,
        model: {
          id: data.pm_id,
          name: data.pm_name,
          type: {
            id: data.pt_id,
            name: data.pt_name,
          },
          printer_brand: {
            id: data.pb_id,
            name: data.pb_name,
          },
        },
        status: {
          id: data.ps_id,
          name: data.ps_name,
        },
      };
    };
  }