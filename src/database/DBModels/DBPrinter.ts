export type DBOrderPrinterType={
    id:number,
    work_details:string,
    p_id:number,
    p_sm:string,
    p_details:string,
    p_deleted:boolean,
    pm_id:number,
    pm_name:string,
    pt_id:number,
    pt_name:string,
    pb_id:number,
    pb_name:string,
    ps_id:number,
    ps_name:string,
    c_id:number,
    c_created_at:Date,
    c_bw:number,
    c_col:number,
    c_scans:number
}

export type DBOrderUnregisteredPrinterType={
    id:number,
    work_details:string,
    up_id:number,
    up_model:string,
    up_sm:string,
    up_details:string,
    c_id:number,
    c_created_at:Date,
    c_bw:number,
    c_col:number,
    c_scans:number
}

export type DBClientPrinterType={
    id:number,
    serial_number:string,
    details:string,
    deleted:boolean,
    pm_id:number,
    pm_name:string,
    pb_id:number,
    pb_name:string,
    ps_id:number,
    ps_name:string,
    pt_id:number,
    pt_name:string,
    c_id:number,
    c_created_at:Date,
    c_bw:number,
    c_col:number,
    c_scans:number
}

export type DBPrinterType={
    id:number,
    deleted:boolean,
    serial_number:string,
    pm_id:number,
    pm_name:string,
    pb_id:number,
    pb_name:string,
    ps_id:number,
    ps_name:string,
    pt_id:number,
    pt_name:string
}

export type DBTicketPrinterType={
    id:number,
    details:string
    p_id:number
}

export type DBTicketUnregisteredPrinterType={
    id:number,
    details:string
    up_id:number
}

export type DBUnregisteredPrinterType={
    up_id:number,
    up_model:string,
    up_sm:string,
    up_details:string
}