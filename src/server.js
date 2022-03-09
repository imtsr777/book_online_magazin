import express from 'express'
import user_router from './routes/users.js'

const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())

app.use("/users",user_router.router)

app.listen(PORT,()=>{console.log("Server is running... http://localhost:"+PORT)})