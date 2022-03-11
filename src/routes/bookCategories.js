import express from 'express'
import bookCategories from '../controllers/bookCategories.js'
import chekToken from '../middlewares/chektoken.js'
const router = express.Router()


router.post("/",chekToken,bookCategories.ADD_CATEGORY)
router.get("/",bookCategories.GET)

export default {
    router
}