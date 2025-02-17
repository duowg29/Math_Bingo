import { EquationModel } from "./EquationModel";
import { CheckResponse } from "./CheckResponse";
import { ProblemEquationModel } from "./ProblemEquationModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";
import { ICalculatable } from "../interfaces/ICalculatable";
import { ExpressionNormalModel } from "./ExpressionNormalModel";
import { ExpressionModel } from "./ExpressionModel";

export class ProblemEquationSelectAnswerSingleModel extends ProblemEquationModel {

    options: ExpressionModel[];
    answer: ExpressionNormalModel;

    constructor(equation: EquationModel, options: ExpressionModel[], answer: ExpressionModel) {
        super(ElementTypeEnum.ProblemEquationSelectAnswerSingle, 'Select the answer', equation);
        this.options = options;
        this.answer = answer;
    }

    check(userAnswer: ICalculatable[]): CheckResponse {
        if (this.answer.caculate() === userAnswer[0].caculate()) {
            return new CheckResponse(true, 'Well done!');
        }
        return new CheckResponse(false, 'Wrong answer: ' + userAnswer + ', ' + this.answer);
    }

    toString(): string {
        let superStr = super.toString();
        let optionsStr = '';
        this.options.map(option => optionsStr += option.toString() + ', ');
        optionsStr = optionsStr.slice(0, -2);
        return superStr + '; options: ' + optionsStr + '; answer: ' + this.answer.toString(); 
    }
}