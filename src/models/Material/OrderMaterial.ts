import MaterialType from "../Material/Material"

type OrderMaterialType={
    id:number,
    details:string,
    amount:number,
    material:Partial<MaterialType>
}

export default OrderMaterialType;