import { NumberModel } from "./NumberModel";
import { BlankTypeEnum } from "../enums/BlankTypeEnum";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";

export class NumberBlankModel extends NumberModel {

    blankType: BlankTypeEnum;
    blankIndex: number;

    constructor(value: number, blankType: BlankTypeEnum, blankIndex: number) {
        super(ElementTypeEnum.NumberBlank, value);
        this.blankType = blankType;
        this.blankIndex = blankIndex;
    }

    add(other: NumberModel): NumberModel {
        return new NumberBlankModel(this.value + other.value, this.blankType, this.blankIndex);
    }
    subtract(other: NumberModel): NumberModel {
        return new NumberBlankModel(this.value - other.value, this.blankType, this.blankIndex);
    }
    multiple(other: NumberModel): NumberModel {
        return new NumberBlankModel(this.value * other.value, this.blankType, this.blankIndex);
    }
    divide(other: NumberModel): NumberModel {
        return new NumberBlankModel(this.value / other.value, this.blankType, this.blankIndex);
    }
    compareTo(other: NumberModel): number {
        if (this.value === other.value) return 0;
        return this.value > other.value ? 1: -1;
    }
}