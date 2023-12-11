const express = require("express")
const app = express();
const fs = require("fs")
const cors = require("cors")
const bodypaser = require("body-parser")
app.use(cors())
app.use(bodypaser.json())
app.use(bodypaser.urlencoded({
    extended: true
}))
const newdata = fs.readFileSync("db.json")
const data = JSON.parse(newdata)
app.get("/user", (req, res) => {
    console.log(req.query);
    const { per_page } = req.query
    const arr=data.user.slice(0,per_page)
    res.status(200).json(arr)
    
})
app.post("/user", (req, res) => {
    data.user.unshift(req.body)
    fs.writeFileSync("db.json", JSON.stringify(data))
    res.status(200).json({
        masscer: "them thanh cong",
        todo: data.user
    })
})
app.put("/user/:id", (req, res) => {
    const { id } = req.params
    const index = data.user.findIndex((item) => item.id == id)
    data.user[index] = req.body
    fs.writeFileSync("db.json", JSON.stringify(data))
    res.status(200).json({
        masscer: "sua thanh cong",
        todo: data.user
    })
})
app.delete("/user/:id", (req, res) => {
    const { id } = req.params
    const newUser = data.user.filter((item) => item.id != id)
    data.user = newUser
    fs.writeFileSync("db.json", JSON.stringify(data))
    res.status(200).json({
        masscer: "xoa thanh cong",
        todo: data.user
    })
})
app.delete("/user", (req, res) => {
    data.user = []
    fs.writeFileSync("db.json", JSON.stringify(data))
    res.status(200).json({
        masscer: "xoa thanh cong",
        todo: data.user
    })
})
app.patch("/user/:id", (req, res) => {
    const { id } = req.params
    const index = data.user.findIndex((item) => item.id == id)
    data.user[index].completed = !data.user[index].completed
    fs.writeFileSync("db.json", JSON.stringify(data))
    res.status(200).json({
        message: "Sua thanh cong",
        todo: data.user
    })
})
app.listen(8000, () => {
    console.log("chay server thanh cong");
})