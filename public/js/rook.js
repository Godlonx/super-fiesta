import Piece from "./pieces.js";

export default class Rook extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "rook"
    }

    checkMovementsRight() {
        for (let i=0; i<8; i++) {
            this._possibleMoves.push((this._pos%8)+(8*i))
            this._possibleMoves.push((this._pos-this._pos%8)+i)
        }
    }
}