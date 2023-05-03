import { Request } from "express";
import { IWithPagination } from "knex-paginate";
import { TABLES } from "../constants/Enums";
import { TicketFilters } from "../constants/Filter";
import { TicketHelpers } from "../database/DBHelperFunctions.ts/TicketHelpers";
import { DBTicketType } from "../database/DBModels/DBTicket";
import { DBTicketsSelect } from "../database/DBSelects/DBTicketSelects";
import db from "../knexfile";
import TicketType from "../models/Ticket";
import { FilterHelpers, PaginateHelpers } from "../utils/Helpers";
import ContactRepo from "./ContactRepo";
import ContactType from "../models/Client/Contact";
import PrinterRepo from "./PrinterRepo";

class TicketRepo {
  public static getTickets = async (
    req: Request
  ): Promise<IWithPagination<Partial<TicketType>> | undefined> => {
    const { page, limit, filterBy, search } = req.query;
    const filter = filterBy ? String(filterBy) : undefined;
    const searchFilter = search ? `%${search}%` : `%`;

    const query = db(TABLES.TICKET + " as t")
      .select(DBTicketsSelect)
      .leftJoin("user as u", "u.id", "=", "t.user_id")
      .leftJoin("client as c", "c.id", "=", "t.client_id")
      .leftJoin(
        "unregistered_client as uc",
        "uc.id",
        "=",
        "t.unregistered_client_id"
      );

    if (!FilterHelpers.filter(TicketFilters, query, filter, searchFilter))
      return undefined;

    return query
      .orderBy("t.id")
      .paginate(
        await PaginateHelpers.calculatePagination(Number(page), Number(limit))
      )
      .then(async (result: IWithPagination<DBTicketType>) => {
        let finalData: IWithPagination<Partial<TicketType>> = {
          data: await Promise.all(
            result.data.map(async (ticket) => {
              let contacts: Partial<ContactType>[] = [];
              if (ticket.c_id) {
                contacts = await ContactRepo.getContactsByClientId(
                  String(ticket.c_id)
                );
              }
              const printers = await PrinterRepo.getTicketPrintersByTicketId(
                String(ticket.id)
              );
              const unregistered_printers =
                await PrinterRepo.getTicketUnregisteredPrintersByTicketId(
                  String(ticket.id)
                );

              return TicketHelpers.createTicket(
                ticket,
                contacts,
                printers,
                unregistered_printers
              );
            })
          ),
          pagination: result.pagination,
        };
        return finalData;
      });
  };

  public static getTicket = async (id: string) => {
    return db(TABLES.TICKET + " as t")
      .select(DBTicketsSelect)
      .leftJoin("user as u", "u.id", "=", "t.user_id")
      .leftJoin("client as c", "c.id", "=", "t.client_id")
      .leftJoin(
        "unregistered_client as uc",
        "uc.id",
        "=",
        "t.unregistered_client_id"
      )
      .where("t.id", id)
      .first()
      .then(async (ticket: DBTicketType) => {
        let contacts: Partial<ContactType>[] = [];
        if (ticket.c_id) {
          contacts = await ContactRepo.getContactsByClientId(
            String(ticket.c_id)
          );
        }
        const printers = await PrinterRepo.getTicketPrintersByTicketId(
          String(ticket.id)
        );
        const unregistered_printers =
          await PrinterRepo.getTicketUnregisteredPrintersByTicketId(
            String(ticket.id)
          );

        return TicketHelpers.createTicket(
          ticket,
          contacts,
          printers,
          unregistered_printers
        );
      });
  };

  public static takeTicket = async (user_id:string, ticket_id:string) => {
    await db(TABLES.TICKET).update({user_id: user_id}).where("id", ticket_id)
  }
}

export default TicketRepo;
