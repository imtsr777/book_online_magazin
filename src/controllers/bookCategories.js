import BookCategory from "../models/categoryModel.js"
import { QueryTypes } from '@sequelize/core'
import sequelize from "../utils/pg.js"

const ADD_CATEGORY = async(req,res)=>{
    try{
        const { category_name } = req.body
        const { role } = req.userInfo

        if(role!='admin') throw new Error("Only admin can add category")

        if(!category_name) throw new Error("Category name is required")
        
        await BookCategory.create({category_name})

        res.json({message:"Category added"}).status(200)

    }catch(error){
        res.status(400).json({message:error.message})
    }
}

// http://localhost:4000/category?search=emo&id=16

const GET= async (req,res)=>{
    const { id=0,search="",page=1,limit=5 } = req.query
    
    try{
        const categories = await sequelize.query(`
            select * from categories where case
                    when :category_id>0 then category_id=:category_id
                        else true
                    end and 
                    case
                        when length(:search) > 0 then category_name ilike concat('%', :search, '%')
                        else true
                    end order by category_id offset :page limit :limit
        `,{
            type:QueryTypes.SELECT,
            replacements: { category_id:id,search,page:((page-1)*limit),limit}
        })

        res.json(categories)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}

const DELETE = async(req,res)=>{
    try{
        const { category_id } = req.params
        const { role } = req.userInfo

        if(role!='admin') throw new Error("Only admin can delete category")
        if(!category_id) throw new Error("Category id is required")

        await BookCategory.destroy({where:{category_id}})

        res.json({message:"Category succesfuly deleted"}).status(200)

    }
    catch(error){
        res.status(400).json({message:error.message})   
    }
} 


export default {
    ADD_CATEGORY,
    GET,
    DELETE
}