import Piece from "./pieces.js"

export default class Pawn extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "pawn"
    }
}