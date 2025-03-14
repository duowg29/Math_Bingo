import { EquationModel } from "./EquationModel";
import { ProblemModel } from "./ProblemModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";

export abstract class ProblemEquationModel extends ProblemModel {
    equation: EquationModel;

    constructor(elementType: ElementTypeEnum, title: string, equation: EquationModel) {
        super(elementType, title);
        this.equation = equation;
    }

    toString(): string {
        let superStr = super.toString();
        return superStr + '; equation: ' + this.equation.toString();
    }
}