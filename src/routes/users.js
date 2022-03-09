import express from 'express'
const router = express.Router()
import user_controller from "../controllers/users.js"

router.post("/register",user_controller.REGISTER)

export default {
    router
}