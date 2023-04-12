// import {Board} from './chess.js'

const board = document.createElement("div");
board.className = "board";
document.body.appendChild(board);

for (let i = 0; i < 8; i++) {
    for (let c = 0; c < 8; c++) {
        const cell = document.createElement("div");
        if (i%2 == 0) {
            if (c % 2 == 0) {
                cell.className = "cell white"
            } else {
                cell.className = "cell black"
            }
        } else {
            if (c % 2 != 0) {
                cell.className = "cell white"
            } else {
                cell.className = "cell black"
            }
        }
        cell.id = c+8*i
        cell.onclick = function(){ GetPiece(cell.id) }
        board.appendChild(cell)
    }
}
let handedPiece
let callIndex
const GetPiece = (cellPos) => {
    let val = document.getElementById(cellPos)
    if (handedPiece) {
        val.innerHTML = handedPiece
        callIndex = null
    }
    if (val.innerHTML != null) {
        handedPiece = val.innerHTML
        callIndex = cellPos 
    }
}
