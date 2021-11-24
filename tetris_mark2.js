
const canvas = document.querySelector(".tetrisCanvas");
const nextCanvas = document.querySelector(".tetrisCanvas")
const ctx = canvas.getContext("2d");
const nextCtx = nextCanvas.getContext("2d");

const col = 48; //열
const row = 24; //행

const matrixCol = col / 2
const matrixRow = row / 2

const matrix = makeMatrix(matrixCol, matrixRow);
const blockSize = 20;

//크기조절
ctx.scale(blockSize, blockSize);

const canvasHeight = blockSize * col;
const canvasWidth =  blockSize * row;

let mainBlock = null;
let nextBlock = null;
let intervalTetris = null;
let score = 0;

const blocks = [
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
];

main();

function getRandomBlock() {
    return blocks[Math.floor(Math.random() * blocks.length)]
}

function makeMatrix(col, row) {
    const matrix = new Array(col).fill(0);

    for(let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(row).fill(0);
    }
    return matrix;
}

function main() {
    nextBlock = makeBlock();
    mainBlock = makeBlock();
    mainBlock.x = 4
    mainBlock.y = 1
    handleByBtn();

}

intervalTetris = setInterval(dropBlock, 500)

function dropBlock() {
    if(!checkMove(mainBlock, 0, 1, matrix)) {

        stackBlock(mainBlock, matrix)
        crashBlock(matrix)

        mainBlock = nextBlock;

        mainBlock.x = 4
        mainBlock.y = 1
        nextBlock = makeBlock();

        clearInterval(intervalTetris)
        intervalTetris = setInterval(dropBlock, 500)
    }

    drawBlock(mainBlock, ctx, matrix);
    drawNextBlock(nextBlock, nextCtx);
}

//json형태로 담기
function makeBlock() {
    const nextBlocks = {
        x: 0,
        y: 0,
        shape: getRandomBlock(),
    }
    return nextBlocks;
}

//json형태 복사
function copy(block) {
    let copyBlock = JSON.parse(JSON.stringify(block))
    return copyBlock
}

function drawBlock(block, ctx, matrix) {

    //console.log("draw...........")

    drawBackground(matrix, ctx);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1 / blockSize;
    ctx.strokeRect(0, 0, 3, 2);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1 / blockSize;
    ctx.strokeRect(0, 0, 3, 2);


    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1 / blockSize;
    ctx.strokeRect(7.5, 0, 4.5, 1);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1 / blockSize;
    ctx.strokeRect(7.5, 0, 4.5, 1);

    ctx.font = '0.5pt 바탕';
    ctx.fillStyle = 'black';
    ctx.fillText("Score : " + score, 8, 0.7)

    block.shape.forEach((col, y) => {
        col.forEach((row,x) => {
            if(row > 0) {

                const arr = block.shape
                const colorIdx = arr[1][1]

                const rx = block.x + x
                const ry = block.y + y

                /*ctx.fillStyle = 'black';
                ctx.fillRect((block.x + x * blockSize), (block.y + y * blockSize), blockSize, blockSize);*/

               /* ctx.strokeStyle = 'white';
                ctx.strokeRect((block.x + x), (block.y + y), 1, 1);*/

                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1 / blockSize;
                ctx.strokeRect(rx, ry, 1, 1);

                switch(colorIdx) {
                    case 1:
                        ctx.fillStyle = "orange";
                        ctx.fillRect(rx, ry, 1, 1);
                        break;
                    case 2:
                        ctx.fillStyle = "blue";
                        ctx.fillRect(rx, ry, 1, 1);
                        break;
                    case 3:
                        ctx.fillStyle = "green";
                        ctx.fillRect(rx, ry, 1, 1);
                        break;
                    case 4:
                        ctx.fillStyle = "purple";
                        ctx.fillRect(rx, ry, 1, 1);
                        break;
                    case 5:
                        ctx.fillStyle = "pink";
                        ctx.fillRect(rx, ry, 1, 1);
                        break;
                    case 6:
                        ctx.fillStyle = "brown";
                        ctx.fillRect(rx, ry, 1, 1);
                        break;
                    default:
                       ctx.fillStyle = "red";
                        ctx.fillRect(rx, ry, 1, 1);
                        break;
                }

                //console.log("1. x : " + (block.x + x) + ", y : " + (block.y + y))
                //console.log("2. x : " + rx + ", y : " + ry)
            }
        });
    });

}

function move(block, x, y) {
    block.x += x;
    block.y += y;
}

function checkMove(block, x, y, matrix) {
    const copyBlock = copy(block);
    move(copyBlock, x, y);

    if(check(copyBlock, matrix)) {
        //console.log("pass!");
        move(block, x, y);
        return true;
    } else{
        //console.log("failure");
        return false;
    }
}

function checkRotate(block, matrix) {
    const copyBlock = copy(block);
    rotate(copyBlock);

    if(check(copyBlock, matrix)) {
        //console.log("pass!");
        rotate(block);
        return true;
    } else{
        //console.log("failure");
        return false;
    }
}

function rotate(block) {
    //console.log("reverse...")
    block.shape.forEach((col, y) => {
        for(let x = 0; x < y; x ++) {
            const copyBlock = block.shape[x][y];
            block.shape[x][y] = block.shape[y][x];
            block.shape[y][x] = copyBlock;
        }
    });
    block.shape.forEach(row => {
        row.reverse();
    });
}

function handleByBtn() {

   document.querySelector(".leftBtn").addEventListener("click", evt => {
       checkMove(mainBlock, -1, 0, matrix);
       drawBlock(mainBlock, ctx, matrix);
       drawNextBlock(nextBlock, nextCtx);
   });

   document.querySelector(".rightBtn").addEventListener("click", evt => {
       checkMove(mainBlock, 1, 0, matrix);
       //console.log(mainBlock.x)
       drawBlock(mainBlock, ctx, matrix);
       drawNextBlock(nextBlock, nextCtx);
   });

   document.querySelector(".descentBtn").addEventListener("click", evt => {
       while(checkMove(mainBlock, 0, 1, matrix));
       drawBlock(mainBlock, ctx, matrix);
       drawNextBlock(nextBlock, nextCtx);
   });

   document.querySelector(".rotateBtn").addEventListener("click", evt => {
       checkRotate(mainBlock, matrix);
       drawBlock(mainBlock, ctx, matrix);
       drawNextBlock(nextBlock, nextCtx);
   });

}

function check(block, matrix) {
    let checked = true;

    block.shape.some((col, by) => {
        col.some((row, bx) => {
            if(row > 0) {
                const rx = block.x + bx
                const ry = block.y + by

                if(rx < 0 || rx >= matrix[0].length || ry < 0 || ry >= matrix.length || matrix[ry][rx] > 0) {
                    //console.log("1. y : " + (block.y + by) + " x : " + (block.x + bx))
                    //console.log("2. y : " + ry + " x : " + rx)
                    checked = false;
                    return true;
                }
            }
        });
        if(!checked) {
            return true;
        }
    });
    return checked;
}

function stackBlock(block, matrix) {
    block.shape.forEach((col, by) => {
        col.forEach((row, bx) => {
            if(row > 0) {
                const rx = block.x + bx
                const ry = block.y + by
                matrix[ry][rx] = block.shape[by][bx];
            }
        });
    });
}

function drawBackground(matrix, ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    for(let i = 0; i < 12; i++) {
        for(let j = 0; j < 24; j++) {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1 / blockSize;
            ctx.strokeRect(i, j, 1, 1);

            let idx = matrix[j][i];

            switch(idx) {
                case 1:
                    ctx.fillStyle = 'orange';
                    ctx.fillRect(i, j, 1, 1);
                    break;
                case 2:
                    ctx.fillStyle = 'blue';
                    ctx.fillRect(i, j, 1, 1);
                    break;
                case 3:
                    ctx.fillStyle = 'green';
                    ctx.fillRect(i, j, 1, 1);
                    break;
                case 4:
                    ctx.fillStyle = 'purple';
                    ctx.fillRect(i, j, 1, 1);
                    break;
                case 5:
                    ctx.fillStyle = 'pink';
                    ctx.fillRect(i, j, 1, 1);
                    break;
                case 6:
                    ctx.fillStyle = 'brown';
                    ctx.fillRect(i, j, 1, 1);
                    break;
                case 7:
                    ctx.fillStyle = 'red';
                    ctx.fillRect(i, j, 1, 1);
                    break;
            }
        }
    }
}

function drawNextBlock(nextBlock, ctx) {
    //console.log(block.shape)

    nextBlock.shape.forEach((col, ny) => {
        col.forEach((row, nx) => {
            if(row > 0) {
                const arr = nextBlock.shape;
                const colorIdx = arr[1][1];

                const rx = (nextBlock.x + nx) / 2 + 0.5
                const ry = (nextBlock.y + ny) / 2 + 0.5

                const size = 1 / 2

                ctx.strokeStyle = 'white';
                ctx.lineWidth = 1 / blockSize;
                ctx.strokeRect(rx, ry, size, size);

                switch(colorIdx) {
                    case 1:
                        ctx.fillStyle = "orange";
                        ctx.fillRect(rx, ry, size, size);
                        break;
                    case 2:
                        ctx.fillStyle = "blue";
                        ctx.fillRect(rx, ry, size, size);
                        break;
                    case 3:
                        ctx.fillStyle = "green";
                        ctx.fillRect(rx, ry, size, size);
                        break;
                    case 4:
                        ctx.fillStyle = "purple";
                        ctx.fillRect(rx, ry, size, size);
                        break;
                    case 5:
                        ctx.fillStyle = "pink";
                        ctx.fillRect(rx, ry, size, size);
                        break;
                    case 6:
                        ctx.fillStyle = "brown";
                        ctx.fillRect(rx, ry, size, size);
                        break;
                    default:
                        ctx.fillStyle = "red";
                        ctx.fillRect(rx, ry, size, size);
                        break;
                }

            }
        })
    })
}

function crashBlock(matrix) {
    for(let i = 0; i < matrix.length; i++) {

        //console.log(matrix[i]);
        //console.log("------------num : " + i);
        //console.log(matrix[i].includes(0));

        if(!(matrix[i].includes(0))) {
            //console.log(i + " 는 삭제!");
            matrix.splice(i, 1);
            matrix.unshift(new Array(matrixRow).fill(0));
            score += 10;
        }
    }

}


