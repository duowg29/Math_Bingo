//────────────────────────────
// Cell: A container representing a single grid cell.
//────────────────────────────
export class Cell extends Phaser.GameObjects.Container {
    col: number;
    row: number;
    cellSize: number;
    rect: Phaser.GameObjects.Rectangle;
    text: Phaser.GameObjects.Text;
  
    constructor(
      scene: Phaser.Scene,
      col: number,
      row: number,
      cellSize: number,
      borderThickness: number,
      borderColor: number
    ) {
      super(scene, 0, 0);
      this.col = col;
      this.row = row;
      this.cellSize = cellSize;
  
      // Create the cell background rectangle.
      this.rect = scene.add.rectangle(0, 0, cellSize - 2, cellSize - 2, 0xffffff);
      // Set stroke style only if borderThickness is greater than 0.
      if (borderThickness > 0) {
        this.rect.setStrokeStyle(borderThickness, borderColor);
      }
      this.add(this.rect);
  
      // Display cell coordinates (1-indexed)
      this.text = scene.add.text(-cellSize / 4, -cellSize / 4, `${col + 1},${row + 1}`, {
        fontSize: "12px",
        color: "#000"
      });
      this.add(this.text);
    }
  }