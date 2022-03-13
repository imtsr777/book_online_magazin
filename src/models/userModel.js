import {DataTypes, Model} from 'sequelize'
import sequelize from '../utils/pg.js'


const UserModel = sequelize.define('User', {
	user_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: {
        type:DataTypes.STRING,
        unique:true,
        validate:{
            len: [5,16]
        }
    },
    password:{
        type:DataTypes.STRING(300),
        msg:"Password is invalid"
    },
    age:{
        type:DataTypes.INTEGER,
        validate:{
            max:100,
            min:6
        },
        msg:"Age is invalid"
    },

    role:{
        type:DataTypes.STRING,
        defaultValue:"user"
    }
},
 {
	tableName: 'users'
})

UserModel.sync()

// { force: true }
// { alter: true }

export default UserModel