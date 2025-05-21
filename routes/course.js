const { Router } = require("express")

const courseRouter = Router();

courseRouter.get("/preview", (req, res) =>  {
    res.send("courses endpoint")
})

courseRouter.post("/purchase", (req,res) => {
    res.send("course purchase endpoint")
} )

module.exports = {
    courseRouter:courseRouter
}

