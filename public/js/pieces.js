import { piecesMouvements } from "./data.js";

export default class Piece {
    _name;
    _pos;
    _color;
    _possibleMoves;
    constructor(pos, color, sprite) {
        this._pos = pos
        this._color = color
        this._sprite = sprite
        this._possibleMoves = []
    }
    get pos() {
        return this._pos
    }
    set pos(nextPos) {
        this._pos = nextPos
    }
    get name() {
        return this._name
    }
    get color() {
        return this._color
    }
    get sprite() {
        return this._sprite
    }
    get possibleMoves() {
        return this._possibleMoves
    }
    set possibleMoves(vals=[]) {
        this._possibleMoves = []
    }
    checkMovementsRight(board) {
        this._possibleMoves = piecesMouvements[this._name](this, board)

    }
    move(nextPos) {
        this._pos = Number(nextPos)
    }
}