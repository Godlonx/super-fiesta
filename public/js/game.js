const Application = PIXI.Application;
const app = new Application();
document.body.appendChild(app.view);

const board = new PIXI.Container();
app.stage.addChild(board);

const black = 0x000000;
const white = 0xFFFFFF;
const tileSize = 75;
const nbOfTile = 8;
size = tileSize*nbOfTile;
app.renderer.resize(size, size);

for (let line = 0; line < nbOfTile; line++) {
  for (let col = 0; col < nbOfTile; col++) {
    const square = new PIXI.Graphics();
    if (((line + col) % 2) == 1) {
        square.beginFill(black);
    } else {
        square.beginFill(white);
    }
    square.drawRect(col * tileSize, line * tileSize, tileSize, tileSize);
    board.addChild(square);
  }
}
console.log(board.children);