import Piece from "./pieces.js"

export default class Pawn extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "pawn"
    }

    checkMovementsRight(nextPos) {
        if (this._color == "black" && this._pos+8 < 64) {
            this._possibleMoves.push(this._pos+8)
        } else if (this._color == "white" && this._pos-8 > 0) {
            this._possibleMoves.push(this._pos-8)
        }
    }    
}