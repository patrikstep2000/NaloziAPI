import ClientType from "../Client/Client";
import CounterType from "../Counter";
import PrinterModelType from "./PrinterModel";
import PrinterStatusType from "./PrinterStatus";

type PrinterType={
    id:number,
    serial_number:string,
    details:string,
    model:Partial<PrinterModelType>,
    status:Partial<PrinterStatusType>,
    client:Partial<ClientType>,
    all_counters?:CounterType[],
    deleted:boolean
}

export default PrinterType;