const express=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userroute=express.Router();

const {Users}=require("../models/user.model")

userroute.use(express.json())

userroute.get("/",(req,res)=>{
    return res.send("userroute")
})

userroute.get("/alluser",async(req,res)=>{
    const alluser= await Users.findAll();
    return res.send(alluser)
})

userroute.post("/signup",async(req,res)=>{
    const payload=req.body;
    const email=payload.email;
    const password=payload.password;
    const useravailable= await Users.findOne({where:{
        email:email
    }});
    if(useravailable==undefined){
        bcrypt.hash(password, 5, async function(err, hash) {
           payload.password=hash
         try{
           let data= await Users.create(payload)
            res.send({msg:"signup successfull",status:"success"})
         } 
         catch(err){
            console.log(err)
            res.send({msg:"someting went wrong",status:"error"})
         }
            
        });
        
    }else{
        
        return res.send({msg:"user is already exist please login",status:"error"})
    }
})


userroute.post("/login",async(req,res)=>{
    const payload=req.body;
    const email=payload.email;
    const password=payload.password;

    const useravailable= await Users.findOne({where:{
        email:email
    }})

    const hashpassword=useravailable?.password

    if(useravailable){
        bcrypt.compare(password, hashpassword, function(err, result) {
            if(err){
                return res.send({mag:"something went wrong"})
            }
            else{
                if(result){
                    var token = jwt.sign({ foo: 'bar' }, 'hush');
                    return res.send({msg:"login successfull",token:token,status:"success"})

                }else{
                    return res.send({msg:"wrong cradintial"})
                }
            }
        });

   
    }
    else{
        return res.send({msg:"user not available please login first"})
    }
})


// await Users.create({
//     "id":1,
//     "name":payload.name,
//      "email":payload.email,
//      "password":payload.password,
//      "age":payload.age
// })

// res.send("success")

// if(err){
//     return res.send("something went wrong")
// }
// payload.password=hash
// try{
//      Users.Create({
//         id:payload.id,
//         name:payload.name,
//         email:payload.email,
//         password:hash,
//         age:payload.age
//     })
//     .then(()=>{
//         console.log("hello0000000")
//     }).catch((err)=>console.log(err));

//     // let x=insert into `users` (`id`,`name`,`email`,`password`,`age`) VALUES (DEFAULT,payload.name,payload.email,hash,payload.age);
   
// }
// catch(err){
//     return res.send("something is wrong inside")
//     console.log(err);
// }


// return res.send({msg:"signup successfull"})





// userroute.post("/login",async(req,res)=>{
//     const{email,password}=req.body;

//     const useravailable=await Usermodel.findOne({email});
//     const hashpassword=useravailable?.password;
//     const userid=useravailable?._id;

//     if(!useravailable){
//         return  res.send({msg:"please signup first",status:"error"})
//     }
//     else{
//         bcrypt.compare(password, hashpassword, async function(err, result) {
//             if(err){
//                 return res.send({msg:"somethig wrong",status:"error"})
//             }
//             if(result==false){
//                 return res.send({msg:"wrong cradintial",status:"error"})
//             }
//             else{
//                 var token = jwt.sign({ id:userid }, 'hush');
//                 res.cookie("token",token)
//                // const response=await redis.set(email+"token",token);
//                 //const alfa=await redis.get(email+"token")
//                // console.log(alfa)
//                 return res.send({msg:"login successfull",status:"success" ,token:token})

//             }
//         });
//     }
// })


module.exports={userroute}