import Piece from "./pieces.js";

export default class King extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "king"
    }

    checkMovementsRight(nextPos) {
        if (nextPos == this._pos+1) {
            return this._pos%8 < 7
        } else if (nextPos == this._pos-1) {
            return this._pos%8 > 1
        } else if (nextPos == this._pos+8) {
            return this._pos < 46
        } else if (nextPos == this._pos-8) {
            return this._pos > 7
        } else if (nextPos == this._pos+7) {
            return this._pos%8 < 7 && this._pos < 46
        } else if (nextPos == this._pos-7) {
            return this._pos%8 > 1 && this._pos > 1
        } else if (nextPos == this._pos+9) {
            return this._pos < 46 && this._pos%8 < 7
        } else if (nextPos == this._pos-9) {
            return this._pos > 7 && this._pos%8 > 1
        }
        return false
    }    
}