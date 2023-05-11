import Piece from '../pieces.js'

export default class Knight extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "knight"
    }
}