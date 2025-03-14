export class Cell extends Phaser.Geom.Rectangle {
    row: number;
    col: number;

    constructor(col: number, row: number, x: number, y: number, w: number, h: number) {
        super(x, y, w, h);

        this.col = col;
        this.row = row;
    }

    GL() {
        return this.GLM(1);
    }

    GR() {
        return this.GRM(1);
    }

    GT() {
        return this.GTM(1);
    }

    GB() {
        return this.GBM(1);
    }

    GLM(count: number) {
        return new Cell(this.col - count, this.row, this.x - this.width*count, this.y, this.width, this.height)
    }

    GRM(count: number) {
        return new Cell(this.col + count, this.row, this.x + this.width*count, this.y, this.width, this.height);
    }

    GTM(count: number) {
        return new Cell(this.col, this.row - count, this.x, this.y - this.height*count, this.width, this.height);
    }

    GBM(count: number) {
        return new Cell(this.col, this.row + count, this.x, this.y + this.height*count, this.width, this.height);
    }

    toString() {
        return '[' + this.row + ',' + this.col + '/x:' + this.x + ',y:' + this.y + ',w:' + this.width + ',h:' + this.height;
    }
}