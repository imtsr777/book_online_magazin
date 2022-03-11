import {DataTypes, Model} from 'sequelize'
import sequelize from '../utils/pg.js'

const BookCategory = sequelize.define('Category',{
    
    category_id:{
        type:DataTypes.INTEGER,
        autoIncrement: true,
		allowNull: false,
		primaryKey:true
    },
    category_name:{
        type:DataTypes.STRING,
        validate:{
            len :[2,30]
        }
    }
},{
    tableName:'categories'
}
)

BookCategory.sync()

export default BookCategory

