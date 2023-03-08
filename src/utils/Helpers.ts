import { Knex } from "knex";
import { IPaginateParams } from "knex-paginate";
import { ApiSettings } from "../constants/ApiSettings";
import { FiltersProps } from "../constants/Filter";

export class FilterHelpers {
  public static filter = (
    filters: FiltersProps,
    query: Knex.QueryBuilder<{
      id: string;
      order_number: string;
      created_at: string;
      closed_at: string;
      u_fname: string;
      u_lname: string;
      os_name: string;
      c_name: string;
    }>,
    filterBy?: string,
    search?: string
  ): boolean | undefined => {
    if(!filterBy) return true;
    let count = 0;
    Object.keys(filters).forEach((key) => {
      const filter = filters[key].filter;
      const columns = filters[key].dbColumn;
      if (filter === filterBy) {
        query.where((q) => {
          columns.forEach(column => {
            q.orWhereILike(column, search);
          });
        });
        count++;
        return;
      }
    });
    return count != 0;
  };
}


export class PaginateHelpers{
  public static calculatePagination = async (page?:number, limit?:number) : Promise<Readonly<IPaginateParams>> => {
    return {
      perPage: limit || ApiSettings.DEFAULT_OBJECTS_PER_PAGE,
      currentPage: page || 1,
      isLengthAware: true
    }
  }
}