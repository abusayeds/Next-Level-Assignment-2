import { Torder } from "./order-interface"
import { OrderModel } from "./order-model"

const orderCreateIntoDB = async ( orderData: Torder  ) => {
    const result =  await OrderModel.create(orderData)
    return result
  } 


const GetAllOrderDB = async ()  => {
    const result = await OrderModel.find()
    return result
}

const getEmailOnProductDB = async (email:string) => {
  const result = await OrderModel.find({email})
  return result
}
 
  export const orderServise = {
   
    orderCreateIntoDB,
    GetAllOrderDB,getEmailOnProductDB
 
}