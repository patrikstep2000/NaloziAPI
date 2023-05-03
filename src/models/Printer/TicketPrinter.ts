import PrinterType from "./PrinterType"

type TicketPrinterType={
    id:number,
    details?:string,
    printer:Partial<PrinterType>
}

export default TicketPrinterType