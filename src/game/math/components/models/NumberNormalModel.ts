import { NumberModel } from "./NumberModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";

export class NumberNormalModel extends NumberModel {    
    constructor(value: number) {
        super(ElementTypeEnum.NumberNormal, value);
    }

    add(other: NumberModel): NumberModel {
        return new NumberNormalModel(this.value + other.value);
    }
    subtract(other: NumberModel): NumberModel {
        return new NumberNormalModel(this.value - other.value);
    }
    multiple(other: NumberModel): NumberModel {
        return new NumberNormalModel(this.value * other.value);
    }
    divide(other: NumberModel): NumberModel {
        return new NumberNormalModel(this.value / other.value);
    }
    compareTo(other: NumberModel): number {
        if (this.value === other.value) return 0;
        return this.value > other.value ? 1: -1;
    }
}