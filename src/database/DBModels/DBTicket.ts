import { Point } from "../../models/Client/Client"

export type DBTicketType={
    id:number,
    details:string,
    created_at:Date,
    planned_solution_date:Date,
    u_id:number,
    u_fname:string,
    u_lname:string,
    u_email:string,
    c_id:number,
    c_name:string,
    c_erp:number,
    c_oib:string,
    c_address:string,
    c_post_code:number,
    c_city:string,
    c_country:string,
    c_location: Point,
    uc_id:number,
    uc_name:string,
    uc_location:Point,
    uc_address:string
}