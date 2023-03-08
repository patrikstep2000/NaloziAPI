import ClientType from "../../models/Client/Client";
import ContactType from "../../models/Client/Contact";
import PrinterType from "../../models/Printer/PrinterType";


export class ClientHelpers {
    public static createClient = async (
      data: ClientType,
      contacts: Partial<ContactType>[],
      printers: Partial<PrinterType>[]
    ): Promise<ClientType> => {
      return {
        id: data.id,
        name: data.name,
        oib: data.oib,
        erp: data.erp,
        address: data.address,
        post_code: data.post_code,
        city: data.city,
        country: data.country,
        location: data.location,
        contacts: contacts,
        printers: printers,
      };
    };
  }