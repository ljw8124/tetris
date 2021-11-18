
const canvas = document.querySelector(".tetrisCanvas")
const ctx = canvas.getContext("2d")

const row = 20
const col = 40
const blockSize = 10

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
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 1],
        [0 ,0 ,0]
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
]

function getRandomBlock() {
    return blockCategories[Math.floor(Math.random() * blockCategories.length)]
}


startTetris()


function startTetris() {
    const nextBlock = initState()
    const block = nextBlock
    block.x = initBlockRow
    block.y = initBlockCol

    const interval = setInterval(function(block) {
        const copyBlock = copy(block)
        console.log("copyBlock = " + copyBlock.shape)
       // console.log(copyBlock.y)
       // console.log(copyBlock.x)
       // console.log(matrix[copyBlock.y / blockSize][copyBlock.x / blockSize])
       // console.log(block.y / blockSize)
       // console.log("------------")

        if(block.y / blockSize < 38) {

            //console.log("dropBlock activate.....")
            //console.log(block.y)
            //console.log(copyBlock)
            if(check(copyBlock)) {
                move(block, 0, 10)
                draw(block, ctx)

            }

        } else{

            clearInterval(interval)
            stackBlock(block)
            check(block)

            startTetris()

        }
    }, 100, block)
}

function initState() {
    const block = makeBlock()

    draw(block, ctx)
    moveByBtn(block, ctx)
    reverseBlock(block)

    return block
}

function makeMatrix() {
    const matrix = new Array(col).fill(0)
    for(let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(row).fill(0)
    }
    //console.log(matrix)
    return matrix
}

function checkValue(block) {

    console.log("마지막블럭 = " + block.shape[2])
    console.log("첫번째 블럭 위치 = " + block.x)

    for(let index = 0; index < block.shape.length; index++) {

    }

    for(let i = 0; i < block.shape.length; i++) {
        let j = i * 10
        console.log("x좌표 = " + (block.x + j))
        console.log("y좌표 = " + (block.y + j))
    }

    const blockCol = block.shape[1]
    const rx = block.x / 10

    //밑에 값이 1이면 못 내려가게 필요

    block.shape.forEach(value => {
        console.log("각 배열 값 = " + value + ", 2번째 라인 값 = " + block.shape[1])

    })

    /*
    //양옆 테두리 검사 + 옆에 값 1이면 못 움직이게 필요
    if(block.x > 0 && blockCol.length + rx < 20) {
        //console.log("true")
        return true
    } else{
        //console.log("false")
        return false
    }
    */

}

function check(block) {

    let checked = true

    block.shape.some((col, y) => {
        col.some((row, x) => {
            const bx = x * 10
            const by = y * 10

            const rx = (block.x + bx) / 10
            const ry = (block.y + by) / 10

            //console.log("x = " + (block.x + bx))
            //console.log("y = " + (block.y + by))


            if(matrix[ry][rx] > 0) {
                console.log("stop")
                checked = false
                return true
            }

            /*
            if(block.x + bx < 10) {
                console.log("stop")
                console.log(block.x + bx)
                checked = false
                return true
            } else if(block.x + bx >= canvasRow - 10) {
                console.log("stop")
                checked = false
                return true
            }

             */
        })
        if(!checked) {
            return true
        }
    })

    return checked
}

//배열에 넣기
function stackBlock(block) {
    //console.log(block)

        block.shape.forEach((col, y) => {
            col.forEach((row, x) => {
                const bx = x * 10
                const by = y * 10

                const rx = (block.x + bx) / 10
                const ry = (block.y + by) / 10
                /*
                console.log("bx = " + x)
                console.log("by = " + y)
                console.log("matrix = " + matrix[y][x])

                console.log("block = " + block.shape[y][x])
                console.log("진짜 위치 = " + rx + "," + ry)
                console.log(matrix[y][x] + block.shape[y][x])

                console.log("------")
                */

                if(matrix[y][x] + block.shape[y][x] === 1) {
                    matrix[ry][rx] = 1
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

function makeBackGround(block, ctx) {

    //console.log("makeBackGround activate......")
    ctx.clearRect(0, 0, canvasRow, canvasCol)

    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if(matrix[j][i] !== 0) {
                ctx.strokeStyle = "white"
                ctx.fillStyle = "grey"
                ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize)
                ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)

            } else if(matrix[j][i] === 0){
                ctx.fillStyle = "white"
                ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)
            }
        }
    }
}

function draw(block, ctx) {
    makeBackGround(block, ctx)
    //console.log("draw activate.........")

    block.shape.forEach((col, y) => {
        col.forEach((row, x) => {
            if(row > 0) {
                ctx.strokeStyle = "white"
                ctx.fillStyle = "black"
                ctx.strokeRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
                ctx.fillRect((block.x + x * 10), (block.y + y * 10), blockSize, blockSize)
            }
        })
    })

    //console.log(block)
}

function copy(block) {
    let copyBlock = []
    for(let i in block) {
        copyBlock[i] = block[i]
    }
    return copyBlock
}

//실제 움직이는 메서드
function move(block, x, y) {
    block.x += x
    block.y += y
}

//버튼이동 -> 쌓인 블럭과 충돌방지 필요
function moveByBtn(block, ctx) {
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
}


function reverseBlock(block) {
    document.querySelector(".rotateBtn").addEventListener("click", evt => {
        block.shape.forEach((row, x) => {
            //console.log(row)
            for(let y = 0; y < x; y++) {
                const copyBlock = block.shape[y][x]
                block.shape[y][x] = block.shape[x][y]
                block.shape[x][y] = copyBlock
                /*console.log(copyBlock)
                console.log("-----------------")
                console.log(block)*/
            }
        })
        block.shape.forEach(row => {
            row.reverse()
        })
    })
}




