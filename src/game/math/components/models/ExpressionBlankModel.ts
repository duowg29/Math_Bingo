import { ExpressionModel } from "./ExpressionModel";
import { BlankTypeEnum } from "../enums/BlankTypeEnum";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";
import { ElementModel } from "./ElementModel";

export class ExpressionBlankModel extends ExpressionModel {
    blankType: BlankTypeEnum;
    blankIndex: number;

    constructor(elementModels: ElementModel [], blankType: BlankTypeEnum, blankIndex: number) {
        super(ElementTypeEnum.ExpressionBlank, elementModels);
        this.blankType = blankType;
        this.blankIndex = blankIndex;
    }
}