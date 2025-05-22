const { Router } = require("express")
const {purchaseModel, courseModel} = require("../db")
const {userMiddleware} = require("../middleware/user")
const courseRouter = Router();

courseRouter.get("/preview",async function (req, res)   {
    const courses = await courseModel.find({})
    res.json({
        courses
    })

})

courseRouter.post("/purchase",userMiddleware
    , async function(req,res)  {
        const userId = req.userId;
        const courseId = req.body.courseId;
        await purchaseModel.create({
            userId,
            courseId
        })
   res.json({
    message:"course is purchased"
   })
} )

module.exports = {
    courseRouter:courseRouter
}

