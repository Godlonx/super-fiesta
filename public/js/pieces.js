class Piece {
    _name;
    _pos;
    #color;
    constructor(pos, color) {
        this._pos = pos
        this.#color = color
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
        return this.#color
    }
    checkMovements(nextPos) {
        return false
    }
}

class Pawn extends Piece {
    constructor(pos, color) {
        super(pos, color)
        this._name = "pawn"
    }

    checkMovementsRight(nextPos) {
        return this._pos-8 < 0 && nextPos != this._pos-8
    }    
}

class King extends Piece {
    constructor(pos, color) {
        super(pos, color)
        this._name = "king"
    }

    checkMovementsRight(nextPos) {
        if (nextPos == this._pos+1) {
            return this.pos%8 < 7
        } else if (nextPos == this._pos-1) {
            return this.pos%8 > 1
        } else if (nextPos == this._pos+8) {
            return this.pos < 46
        } else if (nextPos == this._pos-8) {
            return this._pos > 7
        }
        return false
    }    
}

class Queen extends Piece {
    constructor(pos, color) {
        super(pos, color)
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

class Bishop extends Piece {
    constructor(pos, color) {
        super(pos, color)
        this._name = "bishop"
    }

    checkMovementsRight(nextPos) {
        for (let i=0; i<8; i++) {
            // console.log(this.pos, i, nextPos,"left-down", this._pos+(7*i),"left-up", this._pos-(7*i),"right-up", this._pos-(9*i),"right-down", this._pos+(9*i) );
            if (this._pos+(7*i) == nextPos || this._pos-(7*i) == nextPos || this._pos+(9*i) == nextPos || this._pos-(9*i) == nextPos) {
                return true
            }
        }
        return false
    }   
}

class Rook extends Piece {
    constructor(pos, color) {
        super(pos, color)
        this._name = "rook"
    }

    checkMovementsRight(nextPos) {
        return (Math.trunc(nextPos/8) == Math.trunc(this.pos/8) || nextPos%8 == this._pos%8)
    }
}

class Knight extends Piece {
    constructor(pos, color) {
        super(pos, color)
        this._name = "knight"
    }

    checkMovementsRight(nextPos) {
        return nextPos == this._pos+(17) || nextPos == this._pos+(15) || nextPos == this._pos+(6) || nextPos == this._pos+(10) || nextPos == this._pos-(17) || nextPos == this._pos-(15) || nextPos == this._pos-(6) || nextPos == this._pos-(10)    
    }
}

let echiquier = ""
for (let i=0; i<8; i++) {
    for (let j=0; j<8; j++) {
        echiquier += j+8*i +" "
        if (j+8*i < 10) {
            echiquier += " "
        }
    }
    echiquier += "\n"
}
console.log(echiquier);

const test = new Knight(4, "black")
console.log(test.checkMovementsRight(19));
