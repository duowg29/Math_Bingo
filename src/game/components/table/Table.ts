import Phaser from "phaser";
import { Cell } from "./Cell";

//────────────────────────────
// TableContainer: A container that holds grid cells, controls, and grid lines.
//────────────────────────────
export class Table extends Phaser.GameObjects.Container {
  m: number;
  n: number;
  cellSize: number;
  rowControlWidth: number;
  rowControlMargin: number;
  colControlHeight: number;
  colControlMargin: number;

  // Adjustable cell border properties.
  // Default is 0 (no border) for each cell.
  cellBorderThickness: number;
  cellBorderColor: number;
  graphics: Phaser.GameObjects.Graphics;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    m: number,
    n: number,
    cellSize: number,
    rowControlWidth: number,
    rowControlMargin: number,
    colControlHeight: number,
    colControlMargin: number
  ) {
    super(scene, x, y);
    this.m = m;
    this.n = n;
    this.cellSize = cellSize;
    this.rowControlWidth = rowControlWidth;
    this.rowControlMargin = rowControlMargin;
    this.colControlHeight = colControlHeight;
    this.colControlMargin = colControlMargin;
    // Set adjustable cell border properties.
    // Change cellBorderThickness to a positive number to give cells a border.
    this.cellBorderThickness = 0;
    this.cellBorderColor = 0x000000;
    this.graphics = scene.add.graphics();
    this.draw();
  }

  draw() {
    this.graphics.clear();
    this.removeAll(true);
    this.graphics = this.scene.add.graphics();
    // Compute grid offset inside container.
    const gridOffsetX = this.rowControlWidth + this.rowControlMargin;
    const gridOffsetY = this.colControlHeight + this.colControlMargin;
    const gridWidth = this.m * this.cellSize;
    const gridHeight = this.n * this.cellSize;

    //────────────────────────────
    // Create grid cells.
    //────────────────────────────
    for (let row = 0; row < this.n; row++) {
      for (let col = 0; col < this.m; col++) {
        // Position each cell relative to the container.
        const cellX = gridOffsetX + col * this.cellSize + this.cellSize / 2;
        const cellY = gridOffsetY + row * this.cellSize + this.cellSize / 2;
        const cell = new Cell(
          this.scene,
          col,
          row,
          this.cellSize,
          this.cellBorderThickness,
          this.cellBorderColor
        );
        cell.setPosition(cellX, cellY);
        this.add(cell);
      }
    }

    //────────────────────────────
    // Draw grid borders (row and column lines).
    //────────────────────────────
  
    this.graphics.lineStyle(2, 0x000000);
    // Outer border.
    this.graphics.strokeRect(gridOffsetX, gridOffsetY, gridWidth, gridHeight);

    // Internal vertical grid lines.
    for (let i = 1; i < this.m; i++) {
      const x = gridOffsetX + i * this.cellSize;
      this.graphics.moveTo(x, gridOffsetY);
      this.graphics.lineTo(x, gridOffsetY + gridHeight);
    }

    // Internal horizontal grid lines.
    for (let j = 1; j < this.n; j++) {
      const y = gridOffsetY + j * this.cellSize;
      this.graphics.moveTo(gridOffsetX, y);
      this.graphics.lineTo(gridOffsetX + gridWidth, y);
    }
    this.graphics.strokePath();
    // Add graphics to the container so grid lines are part of the table.
    this.add(this.graphics);

    //────────────────────────────
    // Create row controls (to the left of grid).
    //────────────────────────────
    for (let row = 0; row < this.n; row++) {
      // Place row control in the center of its area.
      const controlX = this.rowControlWidth / 2;
      const controlY = gridOffsetY + row * this.cellSize + this.cellSize / 2;
      const rowBg = this.scene.add.rectangle(controlX, controlY, this.rowControlWidth, this.cellSize, 0x999999);
      const rowLabel = this.scene.add.text(controlX - 10, controlY - 10, (row + 1).toString(), {
        fontSize: "16px",
        color: "#000"
      });
      const rowContainer = this.scene.add.container(0, 0, [rowBg, rowLabel]);
      this.add(rowContainer);
    }

    //────────────────────────────
    // Create column controls (above grid).
    //────────────────────────────
    for (let col = 0; col < this.m; col++) {
      const controlX = gridOffsetX + col * this.cellSize + this.cellSize / 2;
      const controlY = this.colControlHeight / 2;
      const colBg = this.scene.add.rectangle(controlX, controlY, this.cellSize, this.colControlHeight, 0x999999);
      const colLabel = this.scene.add.text(controlX - 5, controlY - 10, (col + 1).toString(), {
        fontSize: "16px",
        color: "#000"
      });
      const colContainer = this.scene.add.container(0, 0, [colBg, colLabel]);
      this.add(colContainer);
    }
  }
}
