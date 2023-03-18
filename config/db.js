require('dotenv').config()
const {Sequelize} = require("sequelize")

const sequelize =new Sequelize("march18",process.env.sql_user_name,process.env.sql_password,{
    host:"database-3.cdb4xuejm3sx.ap-south-1.rds.amazonaws.com",
    dialect:"mysql"
})



module.exports = {sequelize}