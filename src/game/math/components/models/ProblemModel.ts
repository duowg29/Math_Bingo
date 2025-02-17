import { ElementModel } from "./ElementModel";
import { ICalculatable } from "../interfaces/ICalculatable";
import { ICheckable } from "../interfaces/ICheckable";
import { CheckResponse } from "./CheckResponse";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";

export abstract class ProblemModel extends ElementModel implements ICheckable {
    
    title: string;

    constructor(elementType: ElementTypeEnum, title: string) {
        super(elementType);
        this.title = title;
    }

    abstract check(userAnswer: ICalculatable[]): CheckResponse;

    toString(): string {
        return 'Element type: ' + this.elementType + '; title: ' + this.title;
    }
}