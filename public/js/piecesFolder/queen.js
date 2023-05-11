import Piece from "../pieces.js";

export default class Queen extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "queen"
    }

    // checkMovementsRight() {
    //     for (let i=0; i<8; i++) {
    //         this._possibleMoves.push((this._pos%8)+(8*i))
    //         this._possibleMoves.push((this._pos-this._pos%8)+i)
    //     }
    //     const posX = Math.trunc(this._pos/8)
    //     const posY = this._pos%8
    //     console.log(posX, posY, 8-posX, 8-posY);
    //     for (let i=1; i<8; i++) {
    //         console.log(i, 7-posY, posX);
    //         if (i<=Math.min(posY, 8-posX-1)) { // Left-Down
    //             this._possibleMoves.push(this._pos+(7*i))
    //         }
    //         if (i<=Math.min(posY, posX)) { // Left-Up
    //             this._possibleMoves.push(this._pos-(9*i))
    //         }
    //         if (i<=Math.min(8-posY-1, posX)) { // Right-Up
    //             this._possibleMoves.push(this._pos-(7*i))
    //         }
    //         if (i<=Math.min(8-posY-1, 8-posX-1)) { // Right-Down
    //             this._possibleMoves.push(this._pos+(9*i))
    //         }
    //     }
    // }
}