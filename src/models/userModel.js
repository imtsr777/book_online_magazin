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
        len: [5,16],
        unique:true
    },
    password:{
        type:DataTypes.STRING(300),
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

export default UserModel