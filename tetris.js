/*

const canvas = document.querySelector(".tetrisCanvas")
const ctx = canvas.getContext("2d")

const row = 20
const col = 40
const blockSize = 10
let score = 0

const canvasRow = row * blockSize
const canvasCol = col * blockSize

let initBlockRow = canvasRow / 2 - blockSize
let initBlockCol = canvasCol / 10 - blockSize

const matrix = makeMatrix()

const blockCategories = [
    [
        [1, 1],
        [1, 1]
    ],
    [
        [2, 2, 0],
        [0, 2, 2],
        [0, 0, 0]
    ],
    [
        [0, 3, 3],
        [3, 3, 0],
        [0, 0, 0]
    ],
    [
        [0, 4, 0],
        [4, 4, 4],
        [0, 0, 0]
    ],
    [
        [5, 0, 0],
        [5, 5, 5],
        [0 ,0 ,0]
    ],
    [
        [0, 0, 6],
        [6, 6, 6],
        [0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [7, 7, 7, 7],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
]

function getRandomBlock() {
    return blockCategories[Math.floor(Math.random() * blockCategories.length)]
}

let nextBlock = makeBlock()


startTetris()


function startTetris() {

    let block = nextBlock
    nextBlock = makeBlock()

    block.x = initBlockRow - blockSize
    block.y = initBlockCol
    changeByBtn(block, ctx)

    const copyBlock = copy(block)

    const interval = setInterval(function(block) {

        // console.log("copyBlock = " + copyBlock.shape)
        // console.log(copyBlock.y)
        // console.log(copyBlock.x)
        // console.log(block.y / blockSize)
        // console.log("------------")

        if(block.y / blockSize < 38) {

            //console.log("dropBlock activate.....")
            //console.log(block.y)
            //console.log(copyBlock)
            move(copyBlock, 0, blockSize)
            if(check(copyBlock)) {
                move(block, 0, blockSize)
                draw(block, nextBlock, ctx)

            } else{
                clearInterval(interval)
                stackBlock(block)
                startTetris()
            }

        } else{
            clearInterval(interval)
            stackBlock(block)
            startTetris()
        }
    }, 100  , block)


    dropToFloor(block, interval)
}

function makeMatrix() {
    const matrix = new Array(col).fill(0)
    for(let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(row).fill(0)
    }
    //console.log(matrix)
    return matrix
}

function check(block) {

    let checked = true

    block.shape.some((col, y) => {
        col.some((row, x) => {
            if(row > 0) {
                // console.log("row = " + row)
                const bx = x * 10
                const by = y * 10

                const rx = (block.x + bx) / 10
                const ry = (block.y + by) / 10

                //console.log("x = " + (block.x + bx))
                //console.log("y = " + (block.y + by))

                if(matrix[ry][rx] !== 0) {
                    // console.log("stop")
                    //console.log(block)
                    checked = false
                    return true
                }
            }
        })
        if(!checked) {
            return true
        }
    })
    //console.log("check : " + checked)
    return checked
}

//배열에 넣기
function stackBlock(block) {
    //console.log(block)

    block.shape.forEach((col, y) => {
        col.forEach((row, x) => {
            if(row > 0) {
                const bx = x * 10
                const by = y * 10

                const rx = (block.x + bx) / 10
                const ry = (block.y + by) / 10
                /!*
                console.log("bx = " + x)
                console.log("by = " + y)
                console.log("matrix = " + matrix[y][x])
                console.log("block = " + block.shape[y][x])
                console.log("진짜 위치 = " + rx + "," + ry)
                console.log(matrix[y][x] + block.shape[y][x])
                console.log("------")
                *!/

                if(matrix[y][x] + block.shape[y][x] > 0) {
                    matrix[ry][rx] = block.shape[y][x]
                }
            }

        })
    })
}

function makeBlock() {
    const block = {
        //초기위치설정
        x: 1,
        y: 1,
        shape: getRandomBlock()
    }
    return block
}

function makeBackGround(block, nextBlock,  ctx) {

    //console.log("makeBackGround activate......")
    ctx.clearRect(0, 0, canvasRow, canvasCol)


    drawNextBlock(nextBlock, ctx)

    //crashBlock(matrix)
    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {

            ctx.strokeStyle = "black"
            ctx.strokeRect(0, 0 , 55, 50)

            ctx.strokeStyle = "black"
            ctx.strokeRect(120, 0 , 80, 20)

            ctx.font = "9pt'바탕"
            ctx.fillStyle = "black"
            ctx.fillText("Score: " + score, 125, 15)


            switch(matrix[j][i]) {
                case 1: ctx.strokeStyle = "white"
                    ctx.fillStyle = "orange"
                    ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    break;
                case 2: ctx.strokeStyle = "white"
                    ctx.fillStyle = "blue"
                    ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    break;
                case 3: ctx.strokeStyle = "white"
                    ctx.fillStyle = "green"
                    ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    break;
                case 4: ctx.strokeStyle = "white"
                    ctx.fillStyle = "purple"
                    ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    break;
                case 5: ctx.strokeStyle = "white"
                    ctx.fillStyle = "pink"
                    ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    break;
                case 6: ctx.strokeStyle = "white"
                    ctx.fillStyle = "brown"
                    ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    break;
                case 7: ctx.strokeStyle = "white"
                    ctx.fillStyle = "red"
                    ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
                    ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)
            }

        }
    }
}

function drawNextBlock(block, ctx) {
    block.shape.forEach((col, y) => {
        col.forEach((row, x) => {
            if(row > 0) {
                const arr = block.shape
                const colorIndex = arr[1][1]

                const rx = x * 10 + 10
                const ry = y * 10 + 10

                switch(colorIndex) {
                    case 1: ctx.strokeStyle = "white"
                        ctx.fillStyle = "orange"
                        ctx.strokeRect(rx, ry, blockSize, blockSize)
                        ctx.fillRect(rx, ry, blockSize, blockSize)
                        break;
                    case 2: ctx.strokeStyle = "white"
                        ctx.fillStyle = "blue"
                        ctx.strokeRect(rx, ry, blockSize, blockSize)
                        ctx.fillRect(rx, ry, blockSize, blockSize)
                        break;
                    case 3: ctx.strokeStyle = "white"
                        ctx.fillStyle = "green"
                        ctx.strokeRect(rx, ry, blockSize, blockSize)
                        ctx.fillRect(rx, ry, blockSize, blockSize)
                        break;
                    case 4: ctx.strokeStyle = "white"
                        ctx.fillStyle = "purple"
                        ctx.strokeRect(rx, ry, blockSize, blockSize)
                        ctx.fillRect(rx, ry, blockSize, blockSize)
                        break;
                    case 5: ctx.strokeStyle = "white"
                        ctx.fillStyle = "pink"
                        ctx.strokeRect(rx, ry, blockSize, blockSize)
                        ctx.fillRect(rx, ry, blockSize, blockSize)
                        break;
                    case 6: ctx.strokeStyle = "white"
                        ctx.fillStyle = "brown"
                        ctx.strokeRect(rx, ry, blockSize, blockSize)
                        ctx.fillRect(rx, ry, blockSize, blockSize)
                        break;
                    default: ctx.strokeStyle = "white"
                        ctx.fillStyle = "red"
                        ctx.strokeRect(rx, ry, blockSize, blockSize)
                        ctx.fillRect(rx, ry, blockSize, blockSize)
                }
            }
        })
    })
}

function draw(block, nextBlock, ctx) {
    makeBackGround(block,nextBlock, ctx)
    //console.log("draw activate.........")

    block.shape.forEach((col, y) => {
        col.forEach((row, x) => {
            if(row > 0) {
                const arr = block.shape
                const colorIndex = arr[1][1]

                switch(colorIndex) {
                    case 1: ctx.strokeStyle = "white"
                        ctx.fillStyle = "orange"
                        ctx.strokeRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        ctx.fillRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        break;
                    case 2: ctx.strokeStyle = "white"
                        ctx.fillStyle = "blue"
                        ctx.strokeRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        ctx.fillRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        break;
                    case 3: ctx.strokeStyle = "white"
                        ctx.fillStyle = "green"
                        ctx.strokeRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        ctx.fillRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        break;
                    case 4: ctx.strokeStyle = "white"
                        ctx.fillStyle = "purple"
                        ctx.strokeRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        ctx.fillRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        break;
                    case 5: ctx.strokeStyle = "white"
                        ctx.fillStyle = "pink"
                        ctx.strokeRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        ctx.fillRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        break;
                    case 6: ctx.strokeStyle = "white"
                        ctx.fillStyle = "brown"
                        ctx.strokeRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        ctx.fillRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        break;
                    default: ctx.strokeStyle = "white"
                        ctx.fillStyle = "red"
                        ctx.strokeRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                        ctx.fillRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                }
            }
        })
    })
    //console.log(block)
}

function copy(block) {
    /!*let copyBlock = []
    for(let i in block) {
        copyBlock[i] = block[i]
    }
    return copyBlock*!/
    let copyBlock = JSON.parse(JSON.stringify(block))

    return copyBlock
}

//실제 움직이는 메서드
function move(block, x, y) {
    block.x += x
    block.y += y
}

//버튼이동 -> 쌓인 블럭과 충돌방지 필요
function changeByBtn(block, ctx) {
    document.querySelector(".leftBtn").addEventListener("click", evt => {

        if(block.x > 0) {
            //console.log("left move activate....")
            move(block, -10, 0)
            draw(block, ctx)
        }
    })

    document.querySelector(".rightBtn").addEventListener("click", evt => {

        const blockCol = block.shape[1]
        const rx = block.x / 10

        if(blockCol.length + rx < 20) {
            //console.log("right move activate.....")
            move(block, 10, 0)
            draw(block, ctx)
        }
    })

    document.querySelector(".rotateBtn").addEventListener("click", evt => {
        reverseBlock(block)
        draw(block, ctx)
    })

}

function dropToFloor(block, interval) {
    document.querySelector(".descentBtn").addEventListener("click", evt =>{
        const copyBlock = copy(block)

        if(block.y / blockSize < 38) {

            while(true) {
                move(copyBlock, 0, blockSize);
                if(check(copyBlock)) {
                    move(block, 0, blockSize)
                } else{
                    break;
                }
            }
            clearInterval(interval)
            stackBlock(block)
            startTetris()
        }
    })
}

function reverseBlock(block) {

        console.log("reverse")
        block.shape.forEach((row, x) => {
            //console.log(row)
            for(let y = 0; y < x; y++) {
                const copyBlock = block.shape[y][x]
                block.shape[y][x] = block.shape[x][y]
                block.shape[x][y] = copyBlock
                /!*console.log(copyBlock)
                console.log("-----------------")
                console.log(block)*!/
            }
        })

        block.shape.forEach(row => {
            row.reverse()
        })
}

function crashBlock(matrix) {
    let sum = matrix[matrix.length - 1].reduce((a, b) => a + b)
    //if(sum === col) {
        matrix.splice(matrix.length - 1, 1)
        matrix.unshift(new Array(row).fill(0))
        score += 100
   // }
}


*/
