import { Geom } from "phaser";
import { ExpressionDisplayTypeEnum } from "../enums/ExpressionDisplayTypeEnum";
import { GridSystem } from "../../systems/GridSystem";
import { Cell } from "../../systems/Cell";
import { ElementViewModelCell } from "./ElementViewModelCell";



export abstract class ElementViewModel extends Geom.Rectangle {
    mType: string;
    texture: string;
    frame: number;
    displayType: ExpressionDisplayTypeEnum;
    gs: GridSystem;

    constructor(mType: string, x: number, y: number, w: number, h: number, gs: GridSystem, texture: string = '', frame: number = 0, displayType: ExpressionDisplayTypeEnum = ExpressionDisplayTypeEnum.Oneline) {
        super( x, y, w, h);
        this.mType = mType;
        this.gs = gs;
        this.texture = texture;
        this.frame = frame;
        this.displayType = displayType;
    }

    abstract getRel(tlCell: Cell, brCell: Cell, mType: string): ElementViewModelCell;
    abstract getRealWidth(): number;
    abstract getRealHeight(): number;
    abstract getRealCenterX(): number;
    abstract getRealCenterY(): number;
}