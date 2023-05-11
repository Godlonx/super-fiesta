import Piece from "../pieces.js";

export default class Rook extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "rook"
    }         
}