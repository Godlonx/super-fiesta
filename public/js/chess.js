// Dependecies
import fs from 'fs'

const enemiesData = fs.readFileSync('./enemies.json','utf8');
const enemiesTable = JSON.parse(enemiesData)


piecesMaker = {
    "king": (pos, color) => {
        return new Piece("king", pos, color)
    },
    "pawn": (pos, color) => {
        return new Piece("pawn", pos, color)
    },
    "bishop": (pos, color) => {
        return new Piece("bishop", pos, color)
    },
    "queen": (pos, color) => {
        return new Piece("queen", pos, color)
    },
    "knight": (pos, color) => {
        return new Piece("knight", pos, color)
    },
    "rook": (pos, color) => {
        return new Piece("rook", pos, color)
    }
}

// Classes


class Board {
    constructor(pieces, lvl) {
        this.boardShadow = []
        const enemyPieces = this.setEnemyPieces(lvl)
        this.initBoard(pieces, enemyPieces)
    }

    initBoard(playerPieces, enemyPieces) {
        for (let i=0; i<8; i++) {
            let newLine = []
            for (let j=0; j<8; j++) {
                let notFound = true
                playerPieces.forEach(piece => {
                    if (notFound) {
                        const pos = piece.pos-1
                        const posY = pos%8
                        const posX = Math.trunc(pos/8)
                        if (posX == i && posY == j) {
                            newLine.push(piece)
                            notFound = false
                        }
                    }
                });
                enemyPieces.forEach(piece => {
                    if (notFound) {
                        const pos = piece.pos-1
                        const posY = pos%8
                        const posX = Math.trunc(pos/8)
                        if (posX == i && posY == j) {
                            newLine.push(piece)
                            notFound = false
                        }
                    }
                });
                if (notFound) {
                    newLine.push(null)
                }
            }
            this.boardShadow.push(newLine)
        }
    }

    setEnemyPieces(lvl) {
        let enemyPieces = []
        const enemy = enemiesTable.lvl[lvl]
        for (let i=0; i<enemy.pieces.length; i++) {
            enemyPieces.push(piecesMaker[enemy.pieces[i]](enemy.pos[i], "black"))
        }
        return enemyPieces
    }

    showBoard() {
        let board = ""
        this.boardShadow.forEach(line => {
            line.forEach(object => {
                if (object == null) {
                    board += "____ "
                } else {
                    board += object.name + " "
                }
            });
            board += "\n"
        });
        return board
    }
}

const test = new Board([piecesMaker.king(60, "white"), piecesMaker.pawn(52, "black")], 1)
console.log(test.showBoard());