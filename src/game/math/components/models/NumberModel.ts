import { ElementModel} from "./ElementModel";
import { ICalculatable } from "../interfaces/ICalculatable";
import { INumberable } from "../interfaces/INumberable";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";
import { IComparable } from "../interfaces/IComparable";

export abstract class NumberModel extends ElementModel implements INumberable<NumberModel>, ICalculatable, IComparable<NumberModel> {

    value: number;
    multipleFactor: number; // The multiple factor to get the real number value of the number model
    realValue: number;

    constructor(elementType: ElementTypeEnum,  value: number, multipleFactor: number = 1) {
        super(elementType);
        this.value = value;
        this.multipleFactor = multipleFactor;
        this.realValue = value * multipleFactor;
    }
    
    abstract add(other: NumberModel): NumberModel;
    abstract subtract(other: NumberModel): NumberModel;
    abstract multiple(other: NumberModel): NumberModel;
    abstract divide(other: NumberModel): NumberModel;
    abstract compareTo(other: NumberModel): number;

    caculate(): number {
        return this.value;
    }

    toString() {
        return this.value + '';
    }
}