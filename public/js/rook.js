import Piece from "./pieces.js";

export default class Rook extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "rook"
    }

    checkMovementsRight(nextPos) {
        return (Math.trunc(nextPos/8) == Math.trunc(this.pos/8) || nextPos%8 == this._pos%8)
    }
}