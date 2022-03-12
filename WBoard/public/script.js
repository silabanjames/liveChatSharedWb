let canvas = document.getElementById("canvas")
let colors = document.getElementsByClassName("color")

canvas.height = window.innerHeight
canvas.width = window.innerWidth 

var current = {
    color: 'black'
}

for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
}

function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
}


let ctx = canvas.getContext("2d")

var io = io.connect('http://localhost:9000/')

let x
let y
let warna = current.color
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

io.on("ondraw", ({x, y, warna}) => {
    ctx.lineTo(x, y)
    ctx.stroke().strokeStyle = warna
})

window.onmousemove = (e) => {
    x = e.clientX
    y = e.clientY
    warna = current.color

    if (mouseDown) {
        io.emit("draw", {x, y})
        ctx.lineTo(x, y)
        ctx.stroke()
        ctx.strokeStyle = warna
    }
}