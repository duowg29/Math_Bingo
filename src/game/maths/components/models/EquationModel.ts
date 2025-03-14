import { ElementModel } from "./ElementModel";
import { ExpressionModel } from "./ExpressionModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";
import { EquationSideEnum } from "../enums/EquationSideEnum";
import { BlankTypeEnum } from "../enums/BlankTypeEnum";
import { ExpressionBlankModel } from "./ExpressionBlankModel";

export class EquationModel extends ElementModel {
    leftExpression: ExpressionModel;
    rightExpression: ExpressionModel;
    blankSide: EquationSideEnum;

    constructor(leftExpression: ExpressionModel, rightExpression: ExpressionModel, blankSide: EquationSideEnum) {
        super(ElementTypeEnum.Equation);

        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
        this.blankSide = blankSide;

        if (blankSide === EquationSideEnum.Left) {
            this.leftExpression = new ExpressionBlankModel(leftExpression.elements, BlankTypeEnum.All, 0);
        } else {
            this.rightExpression = new ExpressionBlankModel(rightExpression.elements, BlankTypeEnum.All, 0);
        }
    }

    toString() {
        return this.leftExpression.toString() + '=' + this.rightExpression.toString();
    }
}