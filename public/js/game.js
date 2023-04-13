import { _Pawn } from "./pieces.js";


const board = document.createElement("div");
board.className = "board";
document.body.appendChild(board);

for (let i = 0; i < 8; i++) {
  for (let c = 0; c < 8; c++) {
    const cell = document.createElement("div");
    if (i%2 == 0) {
      if (c % 2 == 0) {
        cell.className = "cell white"
      } else {
        cell.className = "cell black"
      }
    } else {
      if (c % 2 != 0) {
        cell.className = "cell white"
      } else {
        cell.className = "cell black"
      }
    }
    cell.id = c+8*i
    cell.onclick = function(){
      const pawn = new _Pawn(20, 'white'); // créer une instance de la classe Pawn
      const isValidMove = pawn.checkMovementsRight(12); // appeler la méthode checkMovementsRight en passant l'ID de la cellule
      console.log(isValidMove); // imprime true ou false selon si le mouvement est valide ou non

      cell.style.backgroundColor = "orange";
      const correspondingCell = document.getElementById(cell.id - 8);
      correspondingCell.style.backgroundColor = "green";
    }
    board.appendChild(cell)
  }
}