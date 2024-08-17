import express from 'express'

import { ordercontroller } from './order-controller'

const router = express.Router()

router.post("/api/orders",ordercontroller.createOrder)
router.get("/api/orders",ordercontroller.getAllOrder)
// router.get("/api/orders",ordercontroller.findByEmailOrder)

export const OderRouter = router