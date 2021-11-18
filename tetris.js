
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
        const copyBlock = block
        /*console.log(copyBlock.y)
        console.log(copyBlock.x)
        console.log(matrix[copyBlock.y / blockSize][copyBlock.x / blockSize])*/

        if(block.y / blockSize < 38) {

            //console.log("dropBlock activate.....")
            //console.log(block.y)
            console.log(copyBlock)
            move(block, 0, 10)
            draw(block, ctx)

        } else{

            clearInterval(interval)
            stackBlock(block)
            //startTetris()
            checkValue(block)

        }
    }, 50, block)
}

function initState() {
    const block = makeBlock()

    draw(block, ctx)
    moveByBtn(block, ctx)

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
    block.shape.forEach((col, y) => {
        col.forEach((row, x) => {
            const bx = x * 10
            const by = y * 10

            const rx = (block.x + bx) / 10
            const ry = (block.y + by) / 10

            console.log("bx = " + x)
            console.log("by = " + y)
            console.log("matrix = " + matrix[y][x])

            console.log("block = " + block.shape[y][x])
            console.log("진짜 위치 = " + rx + "," + ry)
            console.log(matrix[y][x] + block.shape[y][x])

            console.log("------")

        })
    })
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


       // matrix[by][bx] = 1

}

function makeBlock() {
    const block = {
        //초기위치 위해 설정
        x: 1,
        y: 1,
        shape: getRandomBlock()
    }
    return block
}

//이 단계에서 호출 전 쌓인블럭 복사 붙여넣기 필요
function makeBackGround(block, ctx) {

    //console.log("makeBackGround activate......")
    ctx.clearRect(0, 0, canvasRow, canvasCol)

    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if(matrix[j][i] !== 0) {
                ctx.fillStyle = "grey"
                ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)
            } else if(matrix[j][i] === 0){
                ctx.fillStyle = "white"
                ctx.fillRect(i * blockSize, j * blockSize, blockSize, blockSize)
            }
        }
    }
}

//배열 값에 따른 블럭 출력 과정 필요
function draw(block, ctx) {
    makeBackGround(block, ctx)
    //console.log("draw activate.........")
/*

    ctx.strokeStyle = "black"
    ctx.strokeRect(block.x, block.y, blockSize, blockSize)
*/

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
        if(block.x / blockSize < 19) {
            //console.log("right move activate.....")
            move(block, 10, 0)
            draw(block, ctx)
        }
    })
}


function reverseBlock(block) {
    document.querySelector(".rotateBtn").addEventListener("click", evt => {
        block.shape.forEach((row, y) => {
            
        })
    })
}




