import Piece from "../pieces.js";

export default class King extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "king"
    }  
}