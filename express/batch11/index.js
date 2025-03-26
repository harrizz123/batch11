const express = require("express")

//http instance--server
const app = express()

//Get:http://localhost:3000
app.get("/", (req, res) => {
    res.send("Hello")
})
//Get:http://localhost:3000/car
app.get("/car", (req, res) => {
    res.send("Hello CAR")
})
app.get("/app",(req,res)=>{
res.send("apppp")
})
app.listen(4000)