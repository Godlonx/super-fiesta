import Bishop from './bishop.js';
import Queen from './queen.js';
import King from './king.js';
import Pawn from './pawn.js';
import Rook from './rook.js';
import Knight from './knight.js';

export const enemiesTable = {
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

export const piecesMaker = {
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

export const piecesMouvements = {
    pawn: (piece, board) => {
        const possibleMoves = []
        const pos = piece.pos
        let nextPos = 0;
        if (piece.color == "black" && pos+8 < 64) {
            nextPos = pos+8
        } else if (piece.color == "white" && pos-8 > 0) {
            nextPos = pos-8
        }
        if (nextPos != 0 && board.boardShadow[Math.trunc(nextPos/8)][nextPos%8] == null) {
            possibleMoves.push(nextPos)
        }
        if (nextPos%8>0 && board.boardShadow[Math.trunc((nextPos-1)/8)][(nextPos-1)%8] != null) {
            if (board.boardShadow[Math.trunc((nextPos-1)/8)][(nextPos-1)%8].color != piece.color) {
                possibleMoves.push(nextPos-1)
            }
        }
        if (nextPos%8 < 7 && board.boardShadow[Math.trunc((nextPos+1)/8)][(nextPos+1)%8] != null) {
            if (board.boardShadow[Math.trunc((nextPos+1)/8)][(nextPos+1)%8].color != piece.color) {
                possibleMoves.push(nextPos+1)
            }
        }
        return possibleMoves
    },
    rook: (piece, board) => {
        const possibleMoves = []
        const pos = piece.pos
        for (let i=pos; i%8>=0 && Math.trunc(i/8) == Math.trunc(pos/8); i++) {
            if (board.boardShadow[Math.trunc(i/8)][i%8] != null && i != pos) {
                if (board.boardShadow[Math.trunc(i/8)][i%8].color != piece.color) {
                    possibleMoves.push(i)
                }
                break
            } else if (i != pos) {
                possibleMoves.push(i)
            }
        }
        for (let i=pos; i%8<8 && Math.trunc(i/8) == Math.trunc(pos/8); i--) {
            if (board.boardShadow[Math.trunc(i/8)][i%8] != null && i != pos) {
                if (board.boardShadow[Math.trunc(i/8)][i%8].color != piece.color) {
                    possibleMoves.push(i)
                }
                break
            } else if (i != pos) {
                possibleMoves.push(i)
            }
        }
        for (let i=pos; i>=0; i-=8) {
            if (board.boardShadow[Math.trunc(i/8)][i%8] != null && i != pos) {
                if (board.boardShadow[Math.trunc(i/8)][i%8].color != piece.color) {
                    possibleMoves.push(i)
                }
                break
            } else if (i != pos) {
                possibleMoves.push(i)
            }
        }
        for (let i=pos; i<64; i+=8) {
            if (board.boardShadow[Math.trunc(i/8)][i%8] != null && i != pos) {
                if (board.boardShadow[Math.trunc(i/8)][i%8].color != piece.color) {
                    possibleMoves.push(i)
                }
                break
            } else if (i != pos) {
                possibleMoves.push(i)
            }
        }
        return possibleMoves
    },
    bishop: (piece, board) => {
        const pos = piece.pos
        const possibleMoves = []
        const _posX = Math.trunc(pos/8)
        const _posY = pos%8
        for (let i=pos%8; i>-1; i--) { // Left-Down
            const nextPos = pos+(7*(pos%8-i))
            if (nextPos != pos) {
                if (nextPos >= 64) {
                    break
                } else if (board.boardShadow[Math.trunc(nextPos/8)][nextPos%8] != null) {
                    if (board.boardShadow[Math.trunc(nextPos/8)][nextPos%8].color != piece.color) {
                        possibleMoves.push(nextPos)
                    }
                    break
                } else {
                    possibleMoves.push(nextPos)
                }
            }
        }
        for (let i=pos%8; i<8; i++) {// Right-Down
            const nextPos = pos+(9*(i-pos%8))
            if (nextPos != pos) {
                if (nextPos >= 64) {
                    break
                } else if (board.boardShadow[Math.trunc(nextPos/8)][nextPos%8] != null) {
                    if (board.boardShadow[Math.trunc(nextPos/8)][nextPos%8].color != piece.color) {
                        possibleMoves.push(nextPos)
                    }
                    break
                } else {
                    possibleMoves.push(nextPos)
                }
            }
        }
        for (let i=pos%8; i>-1; i--) {// Left-Up
            const nextPos = pos-(9*(pos%8-i))
            if (nextPos != pos) {
                if (nextPos < 0) {
                    break
                } else if (board.boardShadow[Math.trunc(nextPos/8)][nextPos%8] != null) {
                    if (board.boardShadow[Math.trunc(nextPos/8)][nextPos%8].color != piece.color) {
                        possibleMoves.push(nextPos)
                    }
                    break
                } else {
                    possibleMoves.push(nextPos)
                }
            }
        }
        for (let i=pos%8; i<8; i++) {// Right-Up
            const nextPos = pos-(7*(i-pos%8))
            if (nextPos != pos) {
                if (nextPos < 0) {
                    break
                } else if (board.boardShadow[Math.trunc(nextPos/8)][nextPos%8] != null) {
                    if (board.boardShadow[Math.trunc(nextPos/8)][nextPos%8].color != piece.color) {
                        possibleMoves.push(nextPos)
                    }
                    break
                } else {
                    possibleMoves.push(nextPos)
                }
            }
        }
        return possibleMoves
    },
    knight: (piece, board) => {
        const pos = piece.pos
        const possibleMoves = []
        if (pos%8 < 7 && Math.trunc(pos/8) < 7) {
            const nextMove = pos+17
            if (nextMove < 64){
                if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] == null) {
                    possibleMoves.push(nextMove)
                } else if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] != null && board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8].color != piece.color) {
                    possibleMoves.push(nextMove)
                }
            }
        }
        if (pos%8 > 0 && Math.trunc(pos/8) < 7) {
            const nextMove = pos+15
            if (nextMove < 64){
                if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] == null) {
                    possibleMoves.push(nextMove)
                } else if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] != null && board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8].color != piece.color) {
                    possibleMoves.push(nextMove)
                }
            }
        } 
        if (pos%8 > 1 && Math.trunc(pos/8) < 7) {
            const nextMove = pos+6
            if (nextMove > 0){
                if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] == null) {
                    possibleMoves.push(nextMove)
                } else if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] != null && board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8].color != piece.color) {
                    possibleMoves.push(nextMove)
                }
            }
        }
        if (pos%8 < 6 && Math.trunc(pos/8) < 7) {
            const nextMove = pos+10
            if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] == null) {
                possibleMoves.push(nextMove)
            } else if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] != null && board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8].color != piece.color) {
                possibleMoves.push(nextMove)
            }
        }
        if (pos%8 > 0 && Math.trunc(pos/8) > 1) {
            const nextMove = pos-17 
            if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] == null) {
                possibleMoves.push(nextMove)
            } else if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] != null && board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8].color != piece.color) {
                possibleMoves.push(nextMove)
            }
        }
        if (pos%8 < 7  && Math.trunc(pos/8) > 1) {
            const nextMove = pos-15 
            if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] == null) {
                possibleMoves.push(nextMove)
            } else if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] != null && board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8].color != piece.color) {
                possibleMoves.push(nextMove)
            }
        }
        if (pos%8 < 6  && Math.trunc(pos/8) > 0) {
            const nextMove = pos-6
            if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] == null) {
                possibleMoves.push(nextMove)
            } else if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] != null && board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8].color != piece.color) {
                possibleMoves.push(nextMove)
            }
        }
        if (pos%8 > 1 && Math.trunc(pos/8) > 0) {
            const nextMove = pos-10
            if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] == null) {
                possibleMoves.push(nextMove)
            } else if (board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8] != null && board.boardShadow[Math.trunc((nextMove)/8)][(nextMove)%8].color != piece.color) {
                possibleMoves.push(nextMove)
            }
        }
        return possibleMoves
    },
    queen: (piece, board) => {
        const possibleMoves = []
        const rookMoves = piecesMouvements["rook"](piece, board)
        const bishopMoves = piecesMouvements["bishop"](piece, board)
        rookMoves.forEach(pos => {possibleMoves.push(pos)});
        bishopMoves.forEach(pos => {possibleMoves.push(pos)});
        return possibleMoves
    },
    king: (piece, board) => {
        const possibleMoves = []
        const orientations = [1, -1, 8, -8, 7, 9, -7, -9]
        const pos = piece.pos

        const checkIsEnemy = (nextPos) => {
            if (board.boardShadow[Math.trunc(nextPos/8)][nextPos%8] != null) {
                if (board.boardShadow[Math.trunc(nextPos/8)][nextPos%8].color != piece.color) {
                    possibleMoves.push(nextPos)
                }
            } else {
                possibleMoves.push(nextPos)
            }
        }

        let nextPos = pos+1
        if (nextPos < 64 && nextPos >= 0 && pos%8 < 7) {
            checkIsEnemy(nextPos)
        }
        nextPos = pos-1
        if (nextPos < 64 && nextPos >= 0 && pos%8 > 0) {
            checkIsEnemy(nextPos)
        }
        nextPos = pos+8
        if (nextPos < 64 && nextPos >= 0 && Math.trunc(pos/8) < 7) {
            checkIsEnemy(nextPos)
        }
        nextPos = pos-8
        if (nextPos < 64 && nextPos >= 0 && Math.trunc(pos/8) > 0) {
            checkIsEnemy(nextPos)
        }
        nextPos = pos+7
        if (nextPos < 64 && nextPos >= 0 && Math.trunc(pos/8) < 7 && pos%8 > 0) {
            checkIsEnemy(nextPos)
        }
        nextPos = pos+9
        if (nextPos < 64 && nextPos >= 0 && Math.trunc(pos/8) < 7 && pos%8 < 7) {
            checkIsEnemy(nextPos)
        }
        nextPos = pos-7
        if (nextPos < 64 && nextPos >= 0 && Math.trunc(pos/8) > 0 && pos%8 < 7) {
            checkIsEnemy(nextPos)
        }
        nextPos = pos-9
        if (nextPos < 64 && nextPos >= 0 && Math.trunc(pos/8) > 0 && pos%8 > 0) {
            checkIsEnemy(nextPos)
        }
        return possibleMoves
    }
}

export const piecesUpgrade = {
    "lvl": {
        "0":{"pieces":["Pawn X2", "Bishop", "Knight"]},
        "1":{"pieces":["Pawn X2", "Bishop", "Rook"]},
        "2":{"pieces":["Knight X2", "Bishop X2", "Rook"]},
        "3":{"pieces":["Knight X2", "Rook X2", "Queen"]}
    }
}