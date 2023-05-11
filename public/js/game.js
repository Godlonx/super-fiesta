import Board from './chess.js'
import {piecesMaker} from './data.js';
import {Shop} from './shop.js';

const dotSprite = '<img src="../public/img/dot.png" style="width: 20px; height: 20px; opacity: 0.5;">';
const piecesStart = []


export default class Game {
    constructor(level, PlayerTeam) {
        this.level = level;
        this.basicTeam = [piecesMaker["king"](60, "white"), piecesMaker["queen"](56, "white"), piecesMaker["pawn"](48, "white")]
        this.addedPieces = PlayerTeam
        const PlayerTeamPlaced = this.placePieces(PlayerTeam)
        this.basicTeam = this.basicTeam.concat(PlayerTeamPlaced)
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
        if (this.handedPiece != null) {
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
        } else if (this.handedPiece == null && this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8] != null && this.turn == this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8].color) {
            this.backBoard.boardShadow[Math.trunc(cellPos/8)][cellPos%8].checkMovementsRight(this.backBoard)
            this.handedPiece = selectedPiece.children
            this.cellIndex = cellPos
        }
        this.removeSelected();
        if (this.handedPiece != null) {
            selectedPiece.classList.add("selected");
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

    placePieces = (piecesName) => {
        const placedPieces = []
        piecesName.forEach(name => {
            const invalidPos = []
            this.basicTeam.forEach(piece => {
                invalidPos.push(piece.pos)
            })
            name = name.toLowerCase()
            if (name == "king") {
                placedPieces.push(piecesMaker[name](60, "white"))
            } else if (name == "pawn") {
                let pos = Math.round(Math.random() * (55-48) + 48);
                while (invalidPos.includes(pos)) {
                    pos = Math.round(Math.random() * (55-48) + 48);
                }
                placedPieces.push(piecesMaker[name](pos, "white"))
            } else { 
                let pos = Math.round(Math.random() * (63-56) + 56);
                while (invalidPos.includes(pos)) {
                    pos = Math.round(Math.random() * (63-56) + 56);
                }
                placedPieces.push(piecesMaker[name](pos, "white"))
            }
        })
        return placedPieces
    }

    nextLevel = () => {
        if (this.level < 3) {
            const shop = new Shop(this.level, this.addedPieces);
            shop.createShop();
        } else {
            location.href = "http://127.0.0.1:5500/views/win.html"
        }
    } 

    loose = () => {
        location.href = "http://127.0.0.1:5500/views/lose.html"
    }
}


const game = new Game(1, piecesStart)
game.start()
