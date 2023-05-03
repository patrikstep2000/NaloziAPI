export const DBPrinterSelect={
    id:"p.id",
    deleted:"p.deleted",
    serial_number:"p.serial_number",
    pm_id:"pm.id",
    pm_name:"pm.name",
    pb_id:"pb.id",
    pb_name:"pb.name",
    ps_id:"ps.id",
    ps_name:"ps.name",
    pt_id:"pt.id",
    pt_name:"pt.name"
}

export const DBOrderPrinterSelect={
    id:"opc.id",
    work_details:"opc.work_details",
    p_id:"p.id",
    p_sm:"p.serial_number",
    p_details:"p.details",
    p_deleted:"p.deleted",
    pm_id:"pm.id",
    pm_name:"pm.name",
    pb_id:"pb.id",
    pb_name:"pb.name",
    ps_id:"ps.id",
    ps_name:"ps.name",
    pt_id:"pt.id",
    pt_name:"pt.name",
    c_id:"c.id",
    c_created_at:"c.created_at",
    c_bw:"c.bw_prints",
    c_col:"c.color_prints",
    c_scans:"c.scans"
}

export const DBOrderUnregisteredPrinterSelect={
    id:"opc.id",
    work_details:"opc.work_details",
    up_id:"up.id",
    up_sm:"up.serial_number",
    up_model:"up.model",
    up_details:"up.details",
    c_id:"c.id",
    c_created_at:"c.created_at",
    c_bw:"c.bw_prints",
    c_col:"c.color_prints",
    c_scans:"c.scans"
}

export const DBTicketPrinterSelect={
    id:"tp.id",
    details:"tp.details",
    p_id:"tp.printer_id"
}

export const DBTicketUnregisteredPrinterSelect={
    id:"tp.id",
    details:"tp.details",
    up_id:"tp.unregistered_printer_id"
}

export const DBUnregisteredPrinterSelect={
    up_id:"up.id",
    up_sm:"up.serial_number",
    up_model:"up.model",
    up_details:"up.details",
}