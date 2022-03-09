import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'
import sha256 from 'sha256'
import "dotenv/config"
const REGISTER = async(req,res)=>{
    try{
        const{username,password,age} = req.body
        if(!username || !password || !age){
            throw new Error("All is required")
        }

        let newUser = await UserModel.create({
            username,
            password:sha256(password),
            age
        })

        return res.json({
            token:jwt.sign({
                user_id:newUser.user_id,
                role:newUser.role
            },process.env.PG_SECRET_KEY
            )
        })
    }
    catch(error){
        res.status(200).json({
            message:error.message
        })
    }
}

export default {
    REGISTER
}