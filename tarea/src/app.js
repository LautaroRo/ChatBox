import express from "express"
import __dirname from "./utils.js"
import handlebars from "express-handlebars"
import { Server } from "socket.io"

const app = express()
const PORT = process.env.PORT || 8081

app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.engine("handlebars", handlebars.engine())
app.use(express.static(__dirname + "/public"))



const server = app.listen(PORT, () => console.log("servidor corriendo"))
app.get("/", (req,res) => {
    res.render("home", {msg})
})
const io = new Server(server)

const msg = []
io.on("connection", socket => {

    socket.on("message", (data) => {

        msg.push(data)

        io.emit("messageLogs", msg)

    })

})

