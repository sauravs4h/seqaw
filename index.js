const express=require("express");


const app=express();
app.use(express.json());

//  const {sequelize}=require("./config/db")
//  const {Users}=require("./models/user.model")
//  const {userroute}=require("./routes/user.route")



app.get("/",(req,res)=>{
    return res.send("base api")
})

// app.use("/user",userroute)

app.listen(8000,async()=>{
    // try{
    //     await sequelize.authenticate();
    //     await sequelize.sync()
    //     console.log("connected to db")
    // }
    // catch(err){
    //     console.log(err)
    // }
    console.log("server is running")
})