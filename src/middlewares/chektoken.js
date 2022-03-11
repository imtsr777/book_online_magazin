import jwt from 'jsonwebtoken'
import "dotenv/config"

const chekToken = (req,res,next) =>{

    try{

        const {token} = req.headers
        let userToken = jwt.verify(token,process.env.PG_SECRET_KEY
        )
        req.userInfo = userToken
    }
    
    catch(error){
        return res.status(400).json({message:error.message})
    }

    return next()
}

export default chekToken
