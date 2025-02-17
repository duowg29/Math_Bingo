import { ElementModel } from "./ElementModel";
import { NumberModel } from "./NumberModel";
import { CheckResponse } from "./CheckResponse";
import { ProblemModel } from "./ProblemModel";
import { SequenceModel } from "./SequenceModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";
import { ICalculatable } from "../interfaces/ICalculatable";

export class ProblemSequenceModel extends ProblemModel {

    sequence: SequenceModel;
    options: ElementModel[];
    answer: NumberModel[];

    constructor(sequence: SequenceModel, options: ElementModel[]) {
        super(ElementTypeEnum.ProblemSequence, 'Complete the sequence');
        this.sequence = sequence;
        this.options = options;
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
        let optionsStr = '';
        this.options.map(option => optionsStr += option.toString())
        return 'Sequence: ' + this.sequence.toString() + '; options: ' + optionsStr; 
    }
}