//npm init -y
//npm install -y
//npm i express socket.io
//npm i -D nodemon

let express = require("express")
let app = express()
let httpServer = require("http").createServer(app)
let io = require("socket.io")(httpServer)

let connection = []

io.on('connect' , (socket) => {
    connection.push(socket);
    console.log(`${socket.id} has connected`)

    socket.on('draw', (data) => {
        connection.forEach(con => {
            if(con.id != socket.id){
                con.emit('ondraw', {x: data.x, y: data.y})
            }
        })

    })

    socket.on("down", (data) => {
        connection.forEach(con =>{
            if(con.id != socket.id){
                con.emit("ondown", {x: data.x, y: data.y})
            }
        })
    })
    
    socket.on("disconnect", (reason) => {
        console.log(`${socket.id} is disconnected`)
        connection = connection.filter((con) => con.id !== socket.id)
    })
})

//menampilkan website secara static
app.use(express.static("public"))

let PORT = process.env.PORT || 9000
httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`))