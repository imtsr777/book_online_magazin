import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js'
import sha256 from 'sha256'
import "dotenv/config"
import { QueryTypes } from '@sequelize/core'
import sequelize from '../utils/pg.js'

const REGISTER = async(req,res)=>{
    try{
        const{username,password,age} = req.body
        if(!username || !password || !age || !(password.length>=4 && password.length<16)){
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
            },process.env.PG_SECRET_KEY,
            {
                expiresIn:1200
            }
            )
        })
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}

const LOGIN = async(req,res)=>{
    try{
        const{username,password} = req.body
        if(!username || !password){
            throw new Error("All is required") 
        }

        let [newUser] = await sequelize.query(`select user_id,role from users where username=? and password=?`,{ 
            replacements:[username,sha256(password)],
            type:QueryTypes.SELECT
         })


         if(!newUser) throw new Error("Invalid")

         return res.json({
            token:jwt.sign(newUser,process.env.PG_SECRET_KEY,
                {
                    expiresIn:1200
                }
            )
        })
    }
    catch(error){
        res.status(400).json({
            message:error.message
        })
    }
}


const GET_USERS=async(req,res)=>{
    try{
        const { role } = req.userInfo

        const { search="",id=0,page=1,limit=5} = req.query

        if(role!='admin') throw new Error("Only admin can see users")
        
        const users = await sequelize.query(`select * from users where case
                            when :user_id>0 then user_id=:user_id
                                else true
                                end and 
                            case
                                when length(:search) > 0 then username ilike concat('%', :search, '%')
                                else true end
        `,{
            type:QueryTypes.SELECT,
            replacements:{search,user_id:id}
        })

        res.json(users)


    }

    catch(error){
        res.status(400).json({
            message:error.message
        })
    }

}

export default {
    REGISTER,
    LOGIN,
    GET_USERS
}