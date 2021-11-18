const canvas = document.querySelector(".tetrisCanvas")
const ctx = canvas.getContext("2d")

block = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0]
]

ctx.fillStyle = "black"



ctx.fillRect(0, 0, 30, 30)