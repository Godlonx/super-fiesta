export default class Piece {
    _name;
    _pos;
    _color;
    constructor(pos, color, sprite) {
        this._pos = pos
        this._color = color
        this._sprite = sprite
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
    checkMovementsRight(_nextPos) {
        return false
    }
    move(nextPos) {
        this._pos = Number(nextPos)
    }
}