import Board from './chess.js'
import {piecesMaker, piecesUpgrade} from './data.js';
import {Shop} from './shop.js';

const dotSprite = '<img src="../public/img/dot.png" style="width: 20px; height: 20px; opacity: 0.5;">';
const posStart = [60, 56, 48]
const piecesStart = ["king","queen","pawn"]
console.log(piecesStart[0]);
const startPlayerTeam = [piecesMaker[piecesStart[0]](posStart[0], "white"), piecesMaker[piecesStart[1]](posStart[1], "white"), piecesMaker[piecesStart[2]](posStart[2], "white")]


class Game {
    constructor(level, PlayerTeam) {
        this.level = level;
        this.basicTeam = [piecesMaker["king"](60, "white"), piecesMaker["queen"](56, "white"), piecesMaker["pawn"](48, "white")]
        this.basicTeam.concat(PlayerTeam)
        this.backBoard = new Board(this.basicTeam, this.level)
        this.turn = "white"
        this.handedPiece = null;
        this.cellIndex = null;
        this.board = document.createElement("div");
        this.board.className = "board";
        document.body.appendChild(this.board);
    }

    start = () => {
        this.showBoard()
    }

    sayWin(colorWinner) {
        this.board.remove()
        const winMessage = document.createElement('div')
        winMessage.innerHTML = `${colorWinner} win`
        document.body.appendChild(winMessage)
    }

    play = () => {
        let isFinish = false
        this.backBoard.blackPiecesTake.forEach(piece => {
            if (piece.name == "king") {
                console.log("win");
                this.nextLevel()
                isFinish = true
            }
        })
        this.backBoard.whitePiecesTake.forEach(piece => {
            if (piece.name == "king") {
                this.loose()
                isFinish = true
            }
        })
        if (this.turn == "black" && !isFinish) {
            this.blackPlay()
        }
    }

    blackPlay = () => {
        const pieces = []  
        for (let line=0; line<8; line++) {
            for (let column=0; column<8; column++) {
                const cell = this.backBoard.boardShadow[line][column]
                if (cell != null && cell.color == "black") {
                    pieces.push(cell)
                }
            }
        }
        let hasPlay = false
        pieces.forEach(piece => {
            piece.checkMovementsRight(this.backBoard)
            piece.possibleMoves.forEach(move => {
                const nextPos = this.backBoard.boardShadow[Math.trunc(move/8)][move%8]
                if (nextPos != null) {
                    if (nextPos.name == "king") {
                        hasPlay = true
                        this.GetPiece(piece.pos)
                        this.GetPiece(move)
                    }
                }
            })
        })
        if (!hasPlay) {
            const selectedPiece = pieces[Math.floor(Math.random() * pieces.length)]
            selectedPiece.checkMovementsRight(this.backBoard);
            const selectedMouvement = Math.floor(Math.random() * selectedPiece.possibleMoves.length);
            const mouvement = selectedPiece._possibleMoves[selectedMouvement]
            this.GetPiece(selectedPiece.pos)
            this.GetPiece(mouvement)
        }
    }

    showBoard = () => {
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
                cell.addEventListener("click", () => {
                    this.GetPiece(cell.id)
                })
                if (this.backBoard.boardShadow[i][c] != null) {
                    const pieceImg = document.createElement('img')
                    pieceImg.src = this.backBoard.boardShadow[i][c].sprite
                    cell.appendChild(pieceImg)
                }
                this.board.appendChild(cell)
            }
        }
    }
    
    GetPiece = (cellPos) => {
        const selectedPiece = document.getElementById(cellPos)
        console.log(selectedPiece);
        console.log("1");
        if (this.handedPiece != null) {
            console.log("2");
            if (this.backBoard.boardShadow[Math.trunc(this.cellIndex/8)][this.cellIndex%8].possibleMoves.includes(Number(cellPos))) {
                if (this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8] != null) {
                    if (this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8].color != this.handedPiece.color) {
                        selectedPiece.removeChild(selectedPiece.firstChild)
                        selectedPiece.appendChild(this.handedPiece["0"])
                        if (this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8].color == "white") {
                            this.backBoard.whitePiecesTake.push(this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8])
                        } else {
                            this.backBoard.blackPiecesTake.push(this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8])
                        }
                        this.backBoard.boardShadow[Math.trunc(this.cellIndex/8)][this.cellIndex%8].possibleMoves = []
                        this.backBoard.boardShadow[Math.trunc(this.cellIndex/8)][this.cellIndex%8].move(cellPos)
                        this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8] = this.backBoard.boardShadow[Math.trunc(this.cellIndex/8)][this.cellIndex%8]
                        this.backBoard.boardShadow[Math.trunc(this.cellIndex/8)][this.cellIndex%8] = null
                    }
                } else {
                    console.log("3");
                    selectedPiece.appendChild(this.handedPiece["0"])
                    this.backBoard.boardShadow[Math.trunc(this.cellIndex/8)][this.cellIndex%8].move(cellPos)
                    this.backBoard.boardShadow[Math.trunc(this.cellIndex/8)][this.cellIndex%8].possibleMoves = []
                    this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8] = this.backBoard.boardShadow[Math.trunc(this.cellIndex/8)][this.cellIndex%8]
                    this.backBoard.boardShadow[Math.trunc(this.cellIndex/8)][this.cellIndex%8] = null
                }
                if (this.turn == "black") {
                    this.turn = "white"
                } else {
                    this.turn = "black"
                }
                this.handedPiece = null
                this.cellIndex = null
                this.play()
            }
            this.handedPiece = null
            this.cellIndex = null
        } else if (this.handedPiece == null && this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8] != null) {
            this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8].checkMovementsRight(this.backBoard)
            this.handedPiece = selectedPiece.children
            this.cellIndex = cellPos
        }
        this.removeSelected();
        if (this.handedPiece != null) {
            selectedPiece.classList.add("selected");
            console.log(this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8].possibleMoves);
            this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8].possibleMoves.forEach(val => {
                if (val >= 0) {
                    if (this.backBoard.boardShadow[Math.trunc(val/8)][val%8] != null) {
                        document.getElementById(val).classList.add("eatable")
                    } else {
                        document.getElementById(val).innerHTML = dotSprite
                    }
                }
            })
        }
    }

    removeSelected = () => {
        const cells = document.querySelectorAll(".cell");
        cells.forEach(function(cell) {
        cell.classList.remove("selected");
        cell.classList.remove("eatable")
        cell.innerHTML = cell.innerHTML.replace(dotSprite, "");
        });
    }

    nextLevel = () => {
        document.querySelector(".board").remove()
        const nextGame = new Game(this.level+1, startPlayerTeam)
        nextGame.start()
    }

    loose = () => {
        location.href = "http://127.0.0.1:5500/views/lose.html"
    }
}


const game = new Game(1, startPlayerTeam)
game.start()
