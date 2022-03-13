import express from 'express'
const router = express.Router()
import user_controller from "../controllers/users.js"
import chekToken from "../middlewares/chektoken.js"

router.post("/register",user_controller.REGISTER)
router.post("/login",user_controller.LOGIN)
router.get("/",chekToken,user_controller.GET_USERS)
router.put("/",chekToken,user_controller.CHANG_PASSWORD)

export default {
    router
}

