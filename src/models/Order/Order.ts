import ClientType from "../Client/Client";
import UnregisteredClientType from "../Client/UnregisteredClient";
import OrderMaterialType from "../Material/OrderMaterial";
import OrderPrinterType from "../Printer/OrderPrinter";
import OrderUnregisteredPrinterType from "../Printer/OrderUnregisteredPrinter";
import UserType from "../User/User";
import OrderStatusType from "./OrderStatus";

type OrderType = {
  id: number,
  order_number: string,
  work_details: string,
  created_at: Date,
  closed_at?: Date,
  user: Partial<UserType>,
  client:Partial<ClientType>,
  unregistered_client: Partial<UnregisteredClientType>,
  status: Partial<OrderStatusType>,
  material:Partial<OrderMaterialType>[],
  printers:Partial<OrderPrinterType>[],
  unregistered_printers:Partial<OrderUnregisteredPrinterType>[],
  signed_name: string
  signature: string
};

export default OrderType;
