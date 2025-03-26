import Phaser from "phaser";
import { NumberAdjuster } from "../components/table/NumberAdjuster";
import { Table } from "../components/table/Table";

//────────────────────────────
// Scene: GamePlayScene
//────────────────────────────
export class GamePlayScene1 extends Phaser.Scene {
  constructor() {
    super({ key: "GamePlayScene1" });
  }

  create() {
    // Table parameters (fixed to 5 columns and 4 rows)
    const m = 5;
    const n = 4;
    const cellSize = 50;

    // Control dimensions and margins
    const rowControlWidth = 40;
    const rowControlMargin = 10;  // extra space to the left of grid
    const colControlHeight = 30;
    const colControlMargin = 10;  // extra space above the grid

    // Compute grid offset inside the table container.
    // Grid (cells) starts at:
    //   x = rowControlWidth + rowControlMargin
    //   y = colControlHeight + colControlMargin
    const gridOffsetX = rowControlWidth + rowControlMargin;
    const gridOffsetY = colControlHeight + colControlMargin;
    const gridWidth = m * cellSize;
    const gridHeight = n * cellSize;

    // Total table container size includes controls and grid.
    const tableWidth = gridOffsetX + gridWidth;
    const tableHeight = gridOffsetY + gridHeight;

    // Center the table container in the scene.
    const gameWidth = this.game.config.width as number;
    const gameHeight = this.game.config.height as number;
    const tableX = (gameWidth - tableWidth) / 2;
    const tableY = (gameHeight - tableHeight) / 2;

    // Create table container and add it to the scene.
    const table = new Table(
      this,
      tableX,
      tableY,
      m,
      n,
      cellSize,
      rowControlWidth,
      rowControlMargin,
      colControlHeight,
      colControlMargin
    );
    this.add.existing(table);

    // Create a NumberAdjuster with a range from 0 to 10 and initial value 5
    const columnAdjuster = new NumberAdjuster(this, table.getBounds().centerX, table.getBounds().top - 30, 1, 10, m, 'horizontal');

    // Listen for value changes.
    columnAdjuster.eventEmitter.on('valueChanged', (newValue: number) => {
      table.m = newValue;
      table.draw();
    });

    // Create a NumberAdjuster with a range from 0 to 10 and initial value 5
    const rowAdjuster = new NumberAdjuster(this,  table.getBounds().left - 50, table.getBounds().centerY, 1, 10, n, 'vertical');

    // Listen for value changes.
    rowAdjuster.eventEmitter.on('valueChanged', (newValue: number) => {
      table.n = newValue;
      table.draw();
    });
  }
}
