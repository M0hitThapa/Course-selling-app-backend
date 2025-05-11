const { Router } = require("express");

const adminRouter = Router()

adminRouter.post("/login", (req,res) =>{
    res.send("admin login portal")
})

adminRouter.post("/signup", (req,res) => {
    res.send("admin signup portal")
})

adminRouter.post("/course", (req,res) => {
    res.send("admin course create portal")
})

adminRouter.delete("/delete", (req,res) => {
    res.send("delete course admin")
})
adminRouter.put("/course", (req,res) => {
    res.send("add course content through admin")
})
adminRouter.get("/course/bulk", (req,res) => {
    res.send("add course content through admin")
})

module.exports = {
    adminRouter:adminRouter
}