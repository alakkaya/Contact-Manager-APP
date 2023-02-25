const express = require("express")
const session = require("express-session")
const app = express()
require("dotenv").config()
require("./src/config/databaseConnection")
const port = process.env.PORT || 5001
const contactRouter = require("./src/routers/contactRoutes")
const userRouter = require("./src/routers/userRoutes")

app.use(express.json())
app.use(session({ secret: "ddflskdf", resave: false, saveUninitialized: true }))

app.use("/api/contacts", contactRouter)
app.use("/api/users", userRouter)


app.get("/", (req, res) => {
    res.send("Hoşgeldiniz...")
})


app.listen(port, () => {
    console.log(`Server started on ${port}`);
})