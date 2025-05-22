// const express = require("express")
// const Router = express.Router;
const { Router } = require("express")
const userRouter = Router();
const { userModel, purchaseModel } = require("../db")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtUserPassword = require("../config");
const { userMiddleware } = require("../middleware/user");



userRouter.post("/signup",async function(req,res) {
    const {email, password, firstName, lastName} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        lastName:lastName,
        
    })

   res.json({
    message:"Signup done"
   })
})
userRouter.post('/signin', async function(req,res) {
   const {email, password } = req.body;

   const user = await userModel.findOne({
    email:email,
   
   });

   if(!user) {
    return res.status(403).json({message:"Incorrect credentials"})
   }

   const Password = await bcrypt.compare(password, user.password);

   if(!Password) {
    return res.status(403).json({message:"Invalid credentials"})
   }

   const token = jwt.sign({id:user._id}, jwtUserPassword, {
    expiresIn:"1h",
   })
   res.json({token:token})

//    if(user) {
//    const token = jwt.sign({
//     id:user._id
//    }, process.env.JWT_USER_PASSWORD)
//    res.json({
//     token:token
//    })
//    } else {
//     res.status(403).json({
//         message:"Incorrect Credentials"
//     })
//    }
   
})



userRouter.get("/purchases",userMiddleware, async function (req,res)  {
   const userId = req.userId

   const purchases = await purchaseModel.find({
      userId
   })
    res.json({
      purchases
    })
})

module.exports = {
   userRouter:userRouter
}