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

export const _piecesUpgrade = {
    "lvl": {
        "0":{"pieces":["pawnX3", "knight"]},
        "1":{"pieces":["pawnX3", "bishop"]},
        "2":{"pieces":["knightX2", "bishopX2", "rook"]},
        "3":{"pieces":["knightX3", "bishopX3", "rookX2", "queen"]}
    }
}