import CounterType from "../Counter";
import OrderMaterialType from "../Material/OrderMaterial";
import UnregisteredPrinterType from "../Printer/UnregisteredPrinter";

type OrderUnregisteredPrinterType={
    id?:number,
    work_details?:string,
    printer:Partial<UnregisteredPrinterType>,
    counter:Partial<CounterType>,
    material:Partial<OrderMaterialType>[]
}

export default OrderUnregisteredPrinterType;