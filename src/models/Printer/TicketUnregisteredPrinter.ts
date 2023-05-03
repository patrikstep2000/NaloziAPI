import UnregisteredPrinterType from "./UnregisteredPrinter"

type TicketUnregisteredPrinterType={
    id:number,
    details?:string,
    printer:Partial<UnregisteredPrinterType>
}

export default TicketUnregisteredPrinterType