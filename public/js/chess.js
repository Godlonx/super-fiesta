// Dependecies
import {enemiesTable, piecesMaker, _piecesUpgrade} from "./data.js";

// const enemiesData = fs.readFileSync('./enemies.json','utf8');
// const enemiesTable = JSON.parse(enemiesData)



export default class Board {
    constructor(pieces, lvl) {
        this.boardShadow = []
        const enemyPieces = this.setEnemyPieces(lvl)
        const playerPieces = [piecesMaker["king"]()] 
        this.initBoard(pieces, enemyPieces)
        this.whitePiecesTake = []
        this.blackPiecesTake = []
    }

    initBoard = (playerPieces, enemyPieces) => {
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

    setEnemyPieces = (lvl) => {
        const enemyPieces = []
        const enemy = enemiesTable.lvl[lvl]
        for (let i=0; i<enemy.pieces.length; i++) {
            enemyPieces.push(piecesMaker[enemy.pieces[i]](enemy.pos[i], "black"))
        }
        return enemyPieces
    }
}