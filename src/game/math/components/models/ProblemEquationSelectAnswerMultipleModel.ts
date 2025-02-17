import { EquationModel } from "./EquationModel";
import { CheckResponse } from "./CheckResponse";
import { ProblemEquationModel } from "./ProblemEquationModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";
import { ICalculatable } from "../interfaces/ICalculatable";
import { ExpressionModel } from "./ExpressionModel";

export class ProblemEquationSelectAnswerMultipleModel extends ProblemEquationModel {

    options: ExpressionModel[];
    answer: ICalculatable[];

    constructor(equation: EquationModel, options: ExpressionModel[], answer: ICalculatable[]) {
        super(ElementTypeEnum.ProblemEquationSelectAnswerMultiple, 'Select all that match', equation);
        this.options = options;
        this.answer = answer;
    }

    check(userAnswer: ICalculatable[]): CheckResponse {
        const wrongUserAnswers = [];
        const rightAnswers = [];
        for (let i=0; i<userAnswer.length; i++) {
            let elementCheck = false;
            for(let j=0; j<this.answer.length; j++) {
                if (userAnswer[i].caculate() === this.answer[j].caculate()) {
                    rightAnswers.push(j);
                    elementCheck = true;
                    break;
                }
            }
            if (!elementCheck) {
                wrongUserAnswers.push(i);
            }
        }
        if(wrongUserAnswers.length === 0) {
            if (rightAnswers.length === userAnswer.length) {
                return new CheckResponse(true, 'Well done');
            }
            return new CheckResponse(false, 'Missing answer: ' + rightAnswers + ', ' + userAnswer);
        } else {
            return new CheckResponse(false, 'Wrong answer: '+ wrongUserAnswers)
        }
    }

    toString(): string {
        let superStr = super.toString();
        let optionsStr = '';
        this.options.map(option => optionsStr += option.toString() + ', ');
        optionsStr = optionsStr.slice(0, -2);
        let answerStr = '';
        this.answer.map(answerItem => answerStr += answerItem.toString() + ', ');
        answerStr = answerStr.slice(0, -2);
        return superStr + '; options: ' + optionsStr + '; answer: ' + answerStr; 
    }
}