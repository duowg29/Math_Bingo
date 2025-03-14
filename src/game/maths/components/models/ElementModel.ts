import { ElementTypeEnum } from "../enums/ElementTypeEnum";

export abstract class ElementModel {
    elementType: ElementTypeEnum;

    constructor(elementType: ElementTypeEnum) {
        this.elementType = elementType;
    }

    abstract toString(): string;
}