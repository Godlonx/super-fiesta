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
        for (let i=0; i<8; i++) {
            // console.log(this.pos, i, nextPos,"left-down", this._pos+(7*i),"left-up", this._pos-(7*i),"right-up", this._pos-(9*i),"right-down", this._pos+(9*i) );
            if (this._pos+(7*i) == nextPos || this._pos-(7*i) == nextPos || this._pos+(9*i) == nextPos || this._pos-(9*i) == nextPos) {
                return true
            }
        }
        return false
    }    
}