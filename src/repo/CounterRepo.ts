import { DateTime } from "luxon";
import { TABLES } from "../constants/Enums";
import db from "../knexfile";
import CounterType from "../models/Counter";

class CounterRepo {
  public static createCounter = async (
    counter: Partial<CounterType>,
    printer_id?: string,
    unregistered_printer_id?: string
  ): Promise<number> => {
    const query = db<CounterType>(TABLES.COUNTER)
      .select("id")
      .where("created_at", counter.created_at?.toString())
      .andWhere("bw_prints", counter.bw_prints);
    counter.color_prints && query.andWhere("color_prints", counter.color_prints);
    counter.scans && query.andWhere("scans", "=", counter.scans);
    printer_id && query.andWhere("printer_id", "=", printer_id);
    unregistered_printer_id && query.andWhere("unregistered_printer_id", "=", unregistered_printer_id);

    return query.then(async (p) => {
      if (p.length === 0) {
        return (
          await db(TABLES.COUNTER)
            .insert({
              created_at: DateTime.now().toString(),
              bw_prints: counter.bw_prints,
              color_prints: counter?.color_prints,
              scans: counter?.scans,
              printer_id: printer_id,
              unregistered_printer_id: unregistered_printer_id,
            })
            .returning("id")
        )[0].id;
      }
    });
  };
}

export default CounterRepo;
