export type DBOrderMaterialType={
    id:number,
    details:string,
    amount:number,
    material_id:number,
    material_name:string,
    material_type_id:number,
    material_type_name:string
}

export type DBMaterialType={
    id:number,
    name:string,
    material_type_id:number,
    material_type:string
}