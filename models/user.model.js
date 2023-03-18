const {DataTypes}=require("sequelize");

const {sequelize}=require("../config/db")

const Users= sequelize.define("users",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },

    name:{
        type:DataTypes.STRING,
       
    },
    email:{
        type:DataTypes.STRING,
        
    },
    password:{
        type:DataTypes.STRING(132),
        
    },
    age:{
        type:DataTypes.INTEGER,
        
    }
},{
    createdAt:false,
    updatedAt:false
})

module.exports={Users}