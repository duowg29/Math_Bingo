import { ElementModel } from "./ElementModel";
import { EquationModel } from "./EquationModel";
import { NumberModel } from "./NumberModel";
import { CheckResponse } from "./CheckResponse";
import { ProblemEquationModel } from "./ProblemEquationModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";

export class ProblemEquationSelectAnswerSingleSlider extends ProblemEquationModel {

    options: ElementModel[];
    answer: NumberModel;
    min: number;
    max: number;
    step: number;
    tolarancePercentage: number;

    constructor(equation: EquationModel, options: ElementModel[], answer: NumberModel, min: number, max: number, step = 0, tolarancePercentage = 0) {
        super(ElementTypeEnum.ProblemEquationSelectAnswerSingleSlider, 'Select the answer', equation);
        this.options = options;
        this.answer = answer;
        this.min = min;
        this.max = max;
        this.step = step;
        if (step === 0) {
            this.title = 'Get close as you can';
        } else {
            this.title = 'Answer on the line';
        }
        this.tolarancePercentage = tolarancePercentage;
    }

    check(userAnswer: NumberModel[]): CheckResponse {
        const userAnswerNumber = userAnswer[0];
        if (this.step === 0) { // Smooth slider
            if (Math.abs(userAnswerNumber.subtract(this.answer).divide(this.answer).value) < this.tolarancePercentage) {
                return new CheckResponse(true, 'Well done');
            }
            return new CheckResponse(false, 'Try your best to get the nearest answer');
        } else { // Stepped slider
            if (this.answer.compareTo(userAnswer[0] as NumberModel) === 0) {
                return new CheckResponse(true, 'Well done!');
            }
            return new CheckResponse(false, 'Wrong answer: ' + userAnswer + ', ' + this.answer);
        }
    }
}