import { ElementModel } from "./ElementModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";
import { OperatorTypeEnum } from "../enums/OperatorTypeEnum";


export class OperatorModel extends ElementModel {

    operatorType: OperatorTypeEnum;

    constructor(operatorType: OperatorTypeEnum) {
        super(ElementTypeEnum.Operator);
        this.operatorType = operatorType;
    }

    toString() {
        return this.operatorType;
    }
}