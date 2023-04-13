import Piece from "./pieces.js";

export default class Queen extends Piece {
    constructor(pos, color, sprite) {
        super(pos, color, sprite)
        this._name = "queen"
    }

    checkMovementsRight(nextPos) {
        if (Math.trunc(nextPos/8) == Math.trunc(this.pos/8) || nextPos%8 == this._pos%8) {
            return true
        }
        const posX = Math.trunc(this._pos/8)
        const posY = this._pos%8
        for (let i=0; i<8; i++) {
            // nextPos,"left-down", this._pos+(7*i),"left-up", this._pos-(7*i),"right-up", this._pos-(9*i),"right-down", this._pos+(9*i)
            if (this._pos+(7*i) == nextPos && i<=Math.min(posY, 8-posX)) { // Left-Down
                return true
            } else if (this._pos-(9*i) == nextPos && i<=Math.min(posY, posX)) { // Left-Up
                return true
            } else if (this._pos-(7*i) == nextPos && i<=Math.min(8-posY, posX)) { // Right-Up
                return true
            } else if (this._pos+(9*i) == nextPos && i<=Math.min(8-posY, 8-posX)) { // Right-Down
                return true
            }
        }
        return false
    }    
}