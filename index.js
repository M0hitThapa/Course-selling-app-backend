const express = require("express")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")
const mongoose  = require("mongoose")
require('dotenv').config();
const app = express()
const port = 3000
app.use(express.json()); 

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)


async function main() {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port,() => {
    console.log(`app is connected to port ${port}`)
} )
}

main()


