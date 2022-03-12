let canvas = document.getElementById("canvas")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let ctx = canvas.getContext("2d")

var io = io.connect('http://localhost:9000/')

let x
let y
let mouseDown = false

window.onmousedown = (e) =>{
    ctx.moveTo(x, y)
    io.emit('down', {x, y})
    mouseDown = true
}

window.onmouseup = (e) => {
    mouseDown = false
}

io.on("ondown", ({x, y}) => {
    ctx.moveTo(x, y)
})

io.on("ondraw", ({x, y}) => {
    ctx.lineTo(x, y)
    ctx.stroke()
})

window.onmousemove = (e) => {
    x = e.clientX
    y = e.clientY

    if (mouseDown) {
        io.emit("draw", {x, y})
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}