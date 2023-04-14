import Piece from "./pieces.js";

export default class Bishop extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "bishop"
    }

    checkMovementsRight() {
        const posX = Math.trunc(this._pos/8)
        const posY = this._pos%8
        // if (nextPos%8 == posY-7 && posX == Math.trunc(nextPos/8)) {
        //     return false
        // }
        for (let i=1; i<8; i++) {
            // nextPos,"left-down", this._pos+(7*i),"left-up", this._pos-(7*i),"right-up", this._pos-(9*i),"right-down", this._pos+(9*i)
            if (i<=Math.min(posY, 8-posX)) { // Left-Down
                this._possibleMoves.push(this._pos+(7*i))
            }
            if (i<=Math.min(posY, posX)) { // Left-Up
                this._possibleMoves.push(this._pos-(9*i))
            }
            if (i<=Math.min(8-posY, posX)) { // Right-Up
                this._possibleMoves.push(this._pos-(7*i))
            }
            if (i<Math.min(8-posY, 8-posX)) { // Right-Down
                this._possibleMoves.push(this._pos+(9*i))
            }
        }
    }   
}