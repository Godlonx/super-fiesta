// Dependecies
import Bishop from './bishop.js';
import Queen from './queen.js';
import King from './king.js';
import Pawn from './pawn.js';
import Rook from './rook.js';
import Knight from './knight.js';

// const enemiesData = fs.readFileSync('./enemies.json','utf8');
// const enemiesTable = JSON.parse(enemiesData)

const enemiesTable = {
    "lvl": {
        "0":{"object":null, "pieces":["king", "pawn", "pawn"], "pos":[3, 11, 12]},
        "1":{"object":null, "pieces":["king", "pawn", "pawn", "pawn", "pawn", "bishop"], "pos":[3, 10, 11, 12, 13, 34]},
        "2":{"object":null, "pieces":["king", "pawn", "pawn", "pawn", "pawn", "bishop", "bishop", "knight"], "pos":[3, 10, 11, 12, 13, 2, 5, 4]},
        "3":{"object":null, "pieces":["king", "pawn", "pawn", "pawn", "pawn", "bishop", "bishop", "knight", "rook", "queen"], "pos":[3, 10, 11, 12, 13, 1, 2, 5, 0, 4]},
        "100":{"object":null, "pieces":["king", "pawn", "bishop", "queen", "rook", "knight"], "pos":[0, 1, 2, 3, 4, 5]}
    }
}

const piecesSprites = {
    whiteKing: "../public/img/piecesSprites/whiteKing.png",
    whitePawn: "../public/img/piecesSprites/whitePawn.png",
    whiteBishop: "../public/img/piecesSprites/whiteBishop.png",
    whiteQueen: "../public/img/piecesSprites/whiteQueen.png",
    whiteKnight: "../public/img/piecesSprites/whiteKnight.png",
    whiteRook: "../public/img/piecesSprites/whiteRook.png",
    blackKing: "../public/img/piecesSprites/blackKing.png",
    blackPawn: "../public/img/piecesSprites/blackPawn.png",
    blackBishop: "../public/img/piecesSprites/blackBishop.png",
    blackQueen: "../public/img/piecesSprites/blackQueen.png",
    blackKnight: "../public/img/piecesSprites/blackKnight.png",
    blackRook: "../public/img/piecesSprites/blackRook.png",
}

const piecesMaker = {
    "king": (pos, color) => {
        return new King(pos, color, piecesSprites[color+"King"])
    },
    "pawn": (pos, color) => {
        return new Pawn(pos, color, piecesSprites[color+"Pawn"])
    },
    "bishop": (pos, color) => {
        return new Bishop(pos, color , piecesSprites[color+"Bishop"])
    },
    "queen": (pos, color) => {
        return new Queen(pos, color, piecesSprites[color+"Queen"])
    },
    "knight": (pos, color) => {
        return new Knight(pos, color, piecesSprites[color+"Knight"])
    },
    "rook": (pos, color) => {
        return new Rook(pos, color, piecesSprites[color+"Rook"])
    }
}

export default class Board {
    constructor(pieces, lvl) {
        this.boardShadow = []
        const enemyPieces = this.setEnemyPieces(lvl)
        const _playerPieces = [piecesMaker["king"]()] 
        this.initBoard(pieces, enemyPieces)
        this.whitePiecesTake = []
        this.blackPiecesTake = []
    }

    initBoard(playerPieces, enemyPieces) {
        for (let i=0; i<8; i++) {
            const newLine = []
            for (let j=0; j<8; j++) {
                let notFound = true
                playerPieces.forEach(piece => {
                    if (notFound) {
                        const pos = piece.pos
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
                        const pos = piece.pos
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
        const enemyPieces = []
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