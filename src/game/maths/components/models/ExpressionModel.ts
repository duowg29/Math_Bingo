import { ElementModel } from "./ElementModel";
import { ICalculatable } from "../interfaces/ICalculatable";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";

export abstract class ExpressionModel extends ElementModel implements ICalculatable {
    elements: ElementModel [];

    constructor(elementType: ElementTypeEnum, elements: ElementModel []) {
        super(elementType);
        this.elements = elements;
    }
    
    toString() {
        let str = '';
        this.elements.map(element => str += element.toString());
        return str;
    }

    caculate(): number {
        return eval(this.toString());
    }
}