import { ExpressionModel } from "./ExpressionModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";
import { ElementModel } from "./ElementModel";

export class ExpressionNormalModel extends ExpressionModel {

    constructor(elementModels: ElementModel []) {
        super(ElementTypeEnum.ExpressionNormal, elementModels);
    }
}