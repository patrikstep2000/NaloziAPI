import ContactType from "../../models/Client/Contact";
import TicketPrinterType from "../../models/Printer/TicketPrinter";
import TicketUnregisteredPrinterType from "../../models/Printer/TicketUnregisteredPrinter";
import TicketType from "../../models/Ticket";
import { DBTicketType } from "../DBModels/DBTicket";

export class TicketHelpers {
  public static createTicket = (
    data: DBTicketType,
    contacts: Partial<ContactType>[],
    printers: Partial<TicketPrinterType>[],
    unregistered_printers?: Partial<TicketUnregisteredPrinterType>[]
  ): Partial<TicketType> => {
    return {
      id: data.id,
      details: data.details,
      created_at: data.created_at,
      planned_solution_date: data.planned_solution_date,
      user: {
        id: data.u_id,
        first_name: data.u_fname,
        last_name: data.u_lname,
        email: data.u_email,
      },
      client: {
        id: data.c_id,
        name: data.c_name,
        erp: data.c_erp,
        oib: data.c_oib,
        address: data.c_address,
        post_code: data.c_post_code,
        city: data.c_city,
        country: data.c_country,
        location: data.c_location,
        contacts: contacts,
      },
      unregistered_client: {
        id: data.uc_id,
        name: data.uc_name,
        location: data.uc_location,
        address: data.uc_address,
      },
      printers: printers,
      unregistered_printers: unregistered_printers
    };
  };
}
