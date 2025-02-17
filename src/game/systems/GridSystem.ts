import { ElementViewModelCell } from "../math/components/viewModels/ElementViewModelCell";
import { Grid } from "../math/systems/Grid";


export class GridSystem {
    grid: Grid;
   
    constructor(w: number, h: number, rowCount: number, colCount: number) {
        this.grid = new Grid(w, h, rowCount, colCount);
    }

    cell(col: number, row: number) {
        if (col < 0) {
            col = this.grid.colCount + col;
        }
        if (row < 0) {
            row = this.grid.rowCount + row;
        }
        return this.grid.layout[row][col];
    }

    evmFromColAndRowIndex(mType: string, tlCol: number, tlRow: number, brCol: number, brRow: number) {
        const tlCell = this.cell(tlCol, tlRow);
        const brCell = this.cell(brCol, brRow);
        return new ElementViewModelCell(mType, tlCell, brCell, this);
    }

    TLC() {
        return this.cell(0, 0);
    }

    TRC() {
        return this.cell(this.grid.colCount - 1, 0);
    }

    BRC() {
        return this.cell(this.grid.colCount - 1, this.grid.rowCount - 1);
    }

    BLC() {
        return this.cell(0, this.grid.rowCount - 1);
    }

    TCC() {
        return this.cell(Math.floor(this.grid.colCount/2), 0);
    }

    BCC() {
        return this.cell(Math.floor(this.grid.colCount/2), this.grid.rowCount - 1);
    }

    LCC() {
        return this.cell(0, Math.floor(this.grid.rowCount/2));
    }

    RCC() {
        return this.cell(this.grid.colCount - 1, Math.floor(this.grid.rowCount/2));
    }

    CC() {
        return this.cell(Math.floor(this.grid.colCount/2), Math.floor(this.grid.rowCount/2));
    }
}