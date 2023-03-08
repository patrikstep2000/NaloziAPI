export const DBOrdersSelect={
    id:"o.id",
    order_number:"o.order_number",
    created_at: "o.created_at",
    closed_at: "o.closed_at",
    u_fname:"u.first_name",
    u_lname:"u.last_name",
    os_name:"os.name",
    c_name:"c.name",
    uc_name:"uc.name"
}

export const DBOrderByIdSelect={
    id:"o.id",
    order_number:"o.order_number",
    work_details: "o.work_details",
    created_at: "o.created_at",
    closed_at: "o.closed_at",
    u_id:"u.id",
    u_fname:"u.first_name",
    u_lname:"u.last_name",
    u_email:"u.email",
    os_id:"os.id",
    os_name:"os.name",
    c_id:"c.id",
    c_name:"c.name",
    c_erp:"c.erp",
    c_oib:"c.oib",
    c_address:"c.address",
    c_post_code:"c.post_code",
    c_city:"c.city",
    c_country:"c.country",
    c_location: "c.location",
    uc_id:"uc.id",
    uc_name:"uc.name",
    uc_location:"uc.location",
    signature: "o.signature",
    signed_name: "o.signed_name"
}