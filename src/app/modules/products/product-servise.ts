

import { TProduct } from "./product-interface";
import ProductModel from "./product-model";


const productCreateIntoDB = async ( prodectDATA:TProduct ) => {
      const result =  await ProductModel.create(prodectDATA)
      return result
    }
   

const getAllProductDB = async () => {
    const result = await ProductModel.find()     // get all  product         
    return result
}

const searchProductDB = async (searchTerm ?: string) => {
    const query = searchTerm ? {
        $or: [
          { name: new RegExp(searchTerm, 'i') },
          { description: new RegExp(searchTerm, 'i') },
          { category: new RegExp(searchTerm, 'i') }
        ]
      } : {};
      const result = await ProductModel.find(query)

    return result
}

const getSingleProductDB = async (id: string) => { 
   const result = await ProductModel.findById(id)
   return result
}

   const updateProductDB = async (id:string, updateData:Partial<TProduct>) => {
   const result = await ProductModel.findByIdAndUpdate(id,updateData,{new:true})    // ptoduct update
  return result
}

const deleteProductDB = async (id:string) => {
    const result = await ProductModel.findByIdAndDelete(id)
    return result
}


export const productServise = {
    productCreateIntoDB ,
    getAllProductDB,
    getSingleProductDB,
    updateProductDB,
    searchProductDB,
    deleteProductDB
      
 
}