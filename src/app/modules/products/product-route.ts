import express from 'express'
import { Productcontroller } from './product-controller'


const router = express.Router()
router.post("/", Productcontroller.createProduct)
router.get("/",Productcontroller.getALLProduct)
router.get("/:productId",Productcontroller.getSingleProduct)
router.put("/:productId",Productcontroller.updateProduct)

 
export const productRouter = router