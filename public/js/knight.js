import Piece from './pieces.js'

export default class Knight extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "knight"
    }

    checkMovementsRight(nextPos) {
        if (nextPos == this._pos+(17)) {
            return this._pos%8 < 7
        }else if (nextPos == this._pos+(15)) {
            return this._pos%8 > 0
        } else if (nextPos == this._pos+(6)) {
            return this._pos%8 > 1 
        } else if (nextPos == this._pos+(10)) {
            return this._pos%8 < 6
        } else if (nextPos == this._pos-(17)) {
            return this._pos%8 > 0
        } else if (nextPos == this._pos-(15)) {
            return this._pos%8 < 7
        } else if (nextPos == this._pos-(6)) {
            return this._pos%8 < 6
        } else if (nextPos == this._pos-(10)) {
            return this._pos%8 > 1
        }
        return false
    }
}