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
    if(counter.id){
      await db(TABLES.COUNTER).where('id', counter.id).del()
    }

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
  };
}

export default CounterRepo;
