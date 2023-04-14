import Piece from './pieces.js'

export default class Knight extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "knight"
    }

    checkMovementsRight() {
        if (this._pos%8 < 7) {
            this._possibleMoves.push(this._pos+(17))
        }
        if (this._pos%8 > 0) {
            this._possibleMoves.push(this._pos+(15))
        } 
        if (this._pos%8 > 1) {
            this._possibleMoves.push(this._pos+(6))
        }
        if (this._pos%8 < 6) {
            this._possibleMoves.push(this._pos+(10))
        }
        if (this._pos%8 > 0  && Math.trunc(this._pos/8) > 1) {
            this._possibleMoves.push(this._pos-(17))
        }
        if (this._pos%8 < 7  && Math.trunc(this._pos/8) > 1) {
            this._possibleMoves.push(this._pos-(15))
        }
        if (this._pos%8 < 6  && Math.trunc(this._pos/8) > 0) {
            this._possibleMoves.push(this._pos-(6))
        }
        if (this._pos%8 > 1 && Math.trunc(this._pos/8) > 0) {
            this._possibleMoves.push(this._pos-(10))
        }
    }
}