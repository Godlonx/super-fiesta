import Piece from "./pieces.js";

export default class King extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "king"
    }

    checkMovementsRight(nextPos) {
        if (nextPos == this._pos+1) {
            return this._pos%8 < 7
        } else if (this._pos-1 == nextPos) {
            return this._pos%8 > 0
        } else if (this._pos+8 == nextPos) {
            return true
        } else if (this._pos-8 == nextPos) {
            return true
        } else if (this._pos+7 == nextPos) { // Left-Down
            return this._pos%8 > 0
        } else if (this._pos-9 == nextPos) { // Left-Up
            return true
        } else if (this._pos-7 == nextPos) { // Right-Up
            return this._pos%8 < 7
        } else if (this._pos+9 == nextPos) { // Right-Down
            return true
        }
        return false
    }    
}