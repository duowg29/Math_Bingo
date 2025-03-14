import { EquationModel } from "./EquationModel";
import { CheckResponse } from "./CheckResponse";
import { ProblemModel } from "./ProblemModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";
import { ICalculatable } from "../interfaces/ICalculatable";
import { ExpressionNormalModel } from "./ExpressionNormalModel";

export class ProblemMatchThePairModel extends ProblemModel {
    equations: EquationModel[];
    leftExpressions: ExpressionNormalModel[];
    rightExpressions: ExpressionNormalModel[];

    constructor(equations: EquationModel[]) {
        super(ElementTypeEnum.ProblemMathThePair, 'Match the pairs');
        this.equations = equations;
    }

    check(userAnswer: ICalculatable[]): CheckResponse {
        const correctAnswer = [];
        const wrongAnswer = [];
        for(let i=0; i<userAnswer.length; i+=2) {
            if (userAnswer[i].caculate() === userAnswer[i+1].caculate()) {
                correctAnswer.push(i);
            } else {
                wrongAnswer.push(i);
            }
        }

        if (wrongAnswer.length === 0) {
            return new CheckResponse(true, 'Well done');
        }
        return new CheckResponse(false, 'Something wrong: ' + wrongAnswer);
    }

    toString(): string {
        let superStr = super.toString();
        let equationsStr = '';
        this.equations.map(equation => equationsStr += equation.toString());
        return superStr + ', equations: ' + equationsStr; 
    }
}