const { Router } = require("express");
const jwt = require("jsonwebtoken")
const adminRouter = Router()
const {adminModel,courseModel} = require("../db");
const bcrypt = require("bcrypt")
const jwtAdminPassword = require("../config");
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function(req,res) {
    const {email, password, firstName, lastName} = req.body;
    const hashPassword = await bcrypt.hash(password, 10)

    await adminModel.create({
        email:email,
        password:hashPassword,
        firstName:firstName,
        lastName:lastName
    }
)
    res.send("admin signup portal")
})
 
adminRouter.post("/signin", async function(req,res) {
    const {email, password} = req.body;
    const admin = await adminModel.findOne({
        email:email
    })
    if(!admin) {
        return res.status(403).json({
            message:"Invalid Credentials"
        })
    }

    const adminPassword  = await bcrypt.compare(password, admin.password)
    if(!adminPassword) {
        return res.status(403).json({
            message:"Invalid Credentials"
        })
    }
    const token =  jwt.sign({id:admin._id}, jwtAdminPassword, {
        expiresIn:"1h"
    })

    res.json({
        token:token
    })

})  



adminRouter.post("/course",adminMiddleware, async function(req,res)  {
    const adminId = req.userId;

    const {title, description,imageUrl,price} = req.body;

    const course = await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId
 })

 res.json({
    message:"course created",
    courseId:course._id
 })

})
adminRouter.put("/course",adminMiddleware, async function (req,res)  {
const adminId = req.userId;
const {title, description, price, imageUrl, courseId} = req.body;

   const courseEdit = await courseModel.updateOne({ _id:courseId, creatorId:adminId}, {
        title:title,
        description:description,
        imageUrl:imageUrl,  
        price:price
  
 })
res.json({
    message:"course updated",
    courseId :courseEdit._id
})
})

adminRouter.delete("/delete", (req,res) => {
    res.send("delete course admin")
})

adminRouter.get("/course/bulk", async function(req,res) {

    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId:adminId
    })
    res.json({
        message:"courses",
        courses
    })
})

module.exports = {
    adminRouter:adminRouter
}