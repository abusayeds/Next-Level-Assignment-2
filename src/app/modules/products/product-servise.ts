import { TProduct } from "./product-interface";
import ProductModel from "./product-model";

const productCreateIntoDB = async (prodectDATA: TProduct) => {
    const result  = await ProductModel.create(prodectDATA)    // create product
    return result
}

const getAllProductDB = async () => {
    const result = await ProductModel.find()     // get all  product         
    return result
}
const searchProductDB = async (searchTerm: string) => {
    const result = await ProductModel.find({
        name: {$regex: searchTerm, $option: 'i'}
    })
    return result
}

const getSingleProductDB = async (id: string) => {    // get single product
   const result = await ProductModel.findById(id)
   return result
}

const updateProductDB = async (id:string, updateData:Partial<TProduct>) => {
   const result = await ProductModel.findByIdAndUpdate(id,updateData,{new:true})    // ptoduct update
  return result
}


export const productServise = {
    productCreateIntoDB,
    getAllProductDB,
    getSingleProductDB,
    updateProductDB,
    searchProductDB
}