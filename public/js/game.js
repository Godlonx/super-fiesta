import Board from './chess.js'

const board = document.createElement("div");
board.className = "board";
document.body.appendChild(board);

const newBoard = new Board([], 100)
newBoard.showBoard()

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
        cell.id = (c+8*i)
        cell.innerHTML = cell.id
        cell.onclick = function(){ GetPiece(cell.id) }
        if (newBoard.boardShadow[i][c] != null) {
            console.log(newBoard.boardShadow[i][c]);
            const pieceImg = document.createElement('img')
            pieceImg.src = newBoard.boardShadow[i][c].sprite
            cell.appendChild(pieceImg)
        }
        board.appendChild(cell)
    }
}
let handedPiece = null;
let cellIndex = null;
const GetPiece = (cellPos) => {
    const val = document.getElementById(cellPos)
    console.log("next pos", cellPos,"pawn pos:", cellIndex);
    if (handedPiece != null) {
        console.log(newBoard.boardShadow[Math.trunc(cellIndex/8)][cellIndex%8].possibleMoves.includes(Number(cellPos)));
        if (newBoard.boardShadow[Math.trunc(cellIndex/8)][cellIndex%8].possibleMoves.includes(Number(cellPos)))
            if (newBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8] != null) {
                if (newBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8].color == "black") {
                    val.removeChild(val.children)
                    val.appendChild(handedPiece["0"])
                    newBoard.whitePiecesTake.push(newBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8])
                    newBoard.boardShadow[Math.trunc(cellIndex/8)][cellIndex%8].move(cellPos)
                    newBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8] = newBoard.boardShadow[Math.trunc(cellIndex/8)][cellIndex%8]
                    newBoard.boardShadow[Math.trunc(cellIndex/8)][cellIndex%8] = null
                    console.log(newBoard.whitePiecesTake);
                }
            } else {
                console.log(handedPiece["0"]);
                val.appendChild(handedPiece["0"])
                newBoard.boardShadow[Math.trunc(cellIndex/8)][cellIndex%8].possibleMoves = []
                newBoard.boardShadow[Math.trunc(cellIndex/8)][cellIndex%8].move(cellPos)
                newBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8] = newBoard.boardShadow[Math.trunc(cellIndex/8)][cellIndex%8]
                newBoard.boardShadow[Math.trunc(cellIndex/8)][cellIndex%8] = null
            }
        handedPiece = null
        cellIndex = null
    } else if (handedPiece == null && newBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8] != null) {
        console.log(val.children);
        handedPiece = val.children
        newBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8].checkMovementsRight(cellPos)
        console.log(newBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8]);
        cellIndex = cellPos
    }
    removeSelected();
    if (handedPiece != null) {
    val.classList.add("selected");
    newBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8].possibleMoves.forEach(val => {
        if (val >= 0 && val <= 63) {
            document.getElementById(val).classList.add("preMoves");
        }
    })
    }
}

function removeSelected() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(function(cell) {
      cell.classList.remove("selected");
      cell.classList.remove("preMoves");
    });
}