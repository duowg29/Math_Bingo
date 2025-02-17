import { Cell } from "./Cell";

export class Grid {
    w: number;
    h: number;
    tileW: number;
    tileH: number;
    rowCount: number;
    colCount: number;
    defaultOriginX: number;
    defaultOriginY: number;
    layout: Cell[][];

    constructor(w: number, h: number, rowCount: number, colCount: number) {
        this.w = w;
        this.h = h;
        this.tileW = w / colCount;
        this.tileH = h / rowCount;
        this.rowCount = rowCount;
        this.colCount = colCount;
        this.setupLayout();
    }

    setupLayout() {
        this.layout = [];
        for (let row = 0; row < this.rowCount; row++) {
            const rowItems: Cell[] = [];
            for (let col = 0; col < this.colCount; col++) {
                const x = col * this.tileW;
                const y = row * this.tileH;
                const cell = new Cell(col, row, x, y, this.tileW, this.tileH);
                rowItems.push(cell);
            }
            this.layout.push(rowItems);
        }
    }
}