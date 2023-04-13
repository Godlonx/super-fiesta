import Piece from './pieces.js'

export default class Knight extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "knight"
    }

    checkMovementsRight(nextPos) {
        return nextPos == this._pos+(17) || nextPos == this._pos+(15) || nextPos == this._pos+(6) || nextPos == this._pos+(10) || nextPos == this._pos-(17) || nextPos == this._pos-(15) || nextPos == this._pos-(6) || nextPos == this._pos-(10)    
    }
}