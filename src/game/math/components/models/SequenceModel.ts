import { ElementModel } from "./ElementModel";
import { NumberModel } from "./NumberModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";

export class SequenceModel extends ElementModel {
    elements: NumberModel [];

    constructor(elements: NumberModel []) {
        super(ElementTypeEnum.Sequence);
        this.elements = elements;
    }
    
    toString() {
        let str: string[] = [];
        this.elements.map(element => str.push(element.toString()));
        return str.join(',');
    }
}