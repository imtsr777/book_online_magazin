import express from 'express'
import user_router from './routes/users.js'
import category_router from './routes/bookCategories.js'
import fileupload from 'express-fileupload'

const app = express()
const PORT = process.env.PORT || 4000

app.use(fileupload())

app.use(express.json())
app.use("/category",category_router.router)
app.use("/users",user_router.router)

app.listen(PORT,()=>{console.log("Server is running... http://localhost:"+PORT)})