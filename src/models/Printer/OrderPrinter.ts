import CounterType from "../Counter";
import OrderMaterialType from "../Material/OrderMaterial";
import PrinterType from "../Printer/Printer";

type OrderPrinterType={
    id:number,
    printer:Partial<PrinterType>,
    counter:Partial<CounterType>,
    material:Partial<OrderMaterialType>[]
}

export default OrderPrinterType;