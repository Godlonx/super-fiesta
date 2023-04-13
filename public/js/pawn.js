import Piece from "./pieces.js"

export default class Pawn extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "pawn"
    }

    checkMovementsRight(nextPos) {
        if (this._color == "black") {
            return this._pos+8 < 64 && nextPos == this._pos+8
        } else {
            return this._pos-8 > 0 && nextPos == this._pos-8
        }
    }    
}