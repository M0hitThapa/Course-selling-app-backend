// const express = require("express")
// const Router = express.Router;
const { Router } = require("express")
const userRouter = Router();
const { userModel } = require("../db")

userRouter.post("/signup",async function(req,res) {
    const {email, password, firstName, lastName} = req.body;
      await userModel.create({
        email:email,
        password:password,
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
    password:password
   });

   if(user) {
    res.send("user is there")
   }
    res.send("login endpoint")
})



userRouter.get("/purchases", (req,res) => {
    res.send("purchased course endpoint")
})

module.exports = {
   userRouter:userRouter
}