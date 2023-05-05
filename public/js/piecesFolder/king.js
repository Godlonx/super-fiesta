import Piece from "../pieces.js";

export default class King extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "king"
    }

    // checkMovementsRight() {
    //     if (this._pos%8 < 7) {
    //         this._possibleMoves.push(this._pos+1)
    //     }
    //     if (this._pos%8 > 0) {
    //         this._possibleMoves.push(this._pos-1)
    //     }
    //     if (this._pos+8 < 64) {
    //         this._possibleMoves.push(this._pos+8)
    //     }
    //     if (this._pos-8 > 0) {
    //         this._possibleMoves.push(this._pos-8)
    //     }
    //     if (this._pos%8 > 0) { // Left-Down
    //         this._possibleMoves.push(this._pos+7)
    //     }
    //     if (this._pos%8 > 0) { // Left-Up
    //         this._possibleMoves.push(this._pos-9)
    //     }
    //     if (this._pos%8 < 7) { // Right-Up
    //         this._possibleMoves.push(this._pos-7)
    //     }
    //     if (this._pos%8 < 7) { // Right-Down
    //         this._possibleMoves.push(this._pos+9) 
    //     }
    // }    
}