import Sequelize from 'sequelize'
import 'dotenv/config'

let sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER,process.env.PG_PASSWORD, {
	host: process.env.PG_HOST,
	dialect: 'postgres',
	logging: false
})

!async function () {
	try {
		await sequelize.authenticate()
		console.log('database connected!')
	} catch(error) {
		console.log('Error in connection to database: ' + error)
	}
}()

export default  sequelize
