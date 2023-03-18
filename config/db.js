
const {Sequelize} = require("sequelize")

const sequelize =new Sequelize("march18","admin","123456789",{
    host:"database-3.cdb4xuejm3sx.ap-south-1.rds.amazonaws.com",
    dialect:"mysql"
})


module.exports = {sequelize}