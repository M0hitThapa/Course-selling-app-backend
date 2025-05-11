// const express = require("express")
// const Router = express.Router;
const { Router } = require("express")
const userRouter = Router();

userRouter.post('/signin', (req,res) => {
    res.send("login endpoint")
})

userRouter.post("/signup", (req,res) => {
    res.send("signup endpoint")
})

userRouter.get("/purchases", (req,res) => {
    res.send("purchased course endpoint")
})

module.exports = {
   userRouter:userRouter
}