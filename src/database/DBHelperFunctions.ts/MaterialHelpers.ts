import MaterialType from "../../models/Material/Material";
import OrderMaterialType from "../../models/Material/OrderMaterial";
import { DBMaterialType, DBOrderMaterialType } from "../DBModels/DBMaterial";


export class MaterialHelpers{
    public static createOrderMaterial = (
        data: DBOrderMaterialType
      ): Partial<OrderMaterialType> => {
        return {
          id: data.id,
          details: data.details,
          amount: data.amount,
          material: {
            id: data.material_id,
            name: data.material_name,
            type: {
              id: data.material_type_id,
              name: data.material_type_name,
            },
          },
        };
      };

      public static createMaterial = (data:DBMaterialType): MaterialType =>{
        return{
          id:data.id,
          name:data.name,
          type:{
            id:data.material_type_id,
            name:data.material_type
          }
        }
    }
}