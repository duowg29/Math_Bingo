import { ElementTypeEnum } from "../components/enums/ElementTypeEnum";
import { EquationSideEnum } from "../components/enums/EquationSideEnum";
import { ElementModel } from "../components/models/ElementModel";
import { EquationModel } from "../components/models/EquationModel";
import { ExpressionModel } from "../components/models/ExpressionModel";
import { ExpressionNormalModel } from "../components/models/ExpressionNormalModel";
import { ProblemEquationSelectAnswerMultipleModel } from "../components/models/ProblemEquationSelectAnswerMultipleModel";
import { ProblemEquationSelectAnswerSingleModel } from "../components/models/ProblemEquationSelectAnswerSingleModel";
import { ProblemModel } from "../components/models/ProblemModel";
import { EquationFactory } from "./EquationFactory";
import { ExpressionFactory } from "./ExpressionFactory";
import { IFactory } from "./IFactory";

export class ProblemFactory implements IFactory {
    equationFactory = new EquationFactory();
    expessionFactory = new ExpressionFactory();

    seedProblems: Map<string, ProblemModel>;

    createARandomModel(): ElementModel {
        const equation = this.equationFactory.createARandomModel();
        const problemEquationSelectAnswerSingle = new ProblemEquationSelectAnswerSingleModel(equation, this.createOptions(equation, 3), this.createAnswer(equation));
        return problemEquationSelectAnswerSingle;
    }
    createTestModels(): ElementModel[] {
        throw new Error("Method not implemented.");
    }

    createAModelByString(str: string): ProblemModel {
        const equation = this.equationFactory.createAModelByString(str);
        const problemEquationSelectAnswerSingle = new ProblemEquationSelectAnswerSingleModel(equation, this.createOptions(equation, 3), this.createAnswer(equation));
        return problemEquationSelectAnswerSingle;
    }

    createAModelByConfig(config: any): ProblemModel {
        let equation = this.equationFactory.createAModelByConfig(config.equation);
        let options: ExpressionModel[] = [];
        config.options.forEach((optionStr: string) => {
            const option = this.expessionFactory.createAModelByConfig(optionStr);
            options.push(option);
        });
        let answers: ExpressionModel[] = [];
        config.answers.forEach((answerStr: string) => {
            const answer = this.expessionFactory.createAModelByConfig(answerStr);
            answers.push(answer);
        });
        switch (config.elementType as ElementTypeEnum) {
            case ElementTypeEnum.ProblemEquationSelectAnswerSingle:
                return new ProblemEquationSelectAnswerSingleModel(equation, options, answers[0]);
            case ElementTypeEnum.ProblemEquationSelectAnswerMultiple:
                return new ProblemEquationSelectAnswerMultipleModel(equation, options, answers);
            default:
                return new ProblemEquationSelectAnswerSingleModel(equation, options, answers[0]);
        }
    }

    /** Other functions */

    createAnswer(equation: EquationModel): ExpressionModel {
        return equation.blankSide === EquationSideEnum.Left ? equation.leftExpression : equation.rightExpression;
    }

    createOptions(equation: EquationModel, optionCount: number, answerCount: number = 1) {
        const template = equation.blankSide === EquationSideEnum.Left ? equation.leftExpression : equation.rightExpression;
        const options: ExpressionModel[] = [template];
        for (let i = 0; i < optionCount; i++) {
            let option: ExpressionNormalModel;
            if (i < answerCount - 1) {
                option = this.expessionFactory.createAModelByTemplate(template, true);
            } else {
                option = this.expessionFactory.createAModelByTemplate(template, false);
            }
            options.push(option);
        }
        return options;
    }

    createSeedProblems() {
        this.seedProblems = new Map();

        // 01: Create a problemEquationSelectAnswerSingle OptionNumber
        const problemEquationSelectAnswerSingleOptionNumber = this.createAModelByConfig({
            equation: {
                leftExpression: '1 + 2',
                rightExpression: '3',
                blankSide: EquationSideEnum.Right
            },
            options: [
                {
                    str: '5',
                    elementType: ElementTypeEnum.ExpressionNormal
                },
                {
                    str: '6',
                    elementType: ElementTypeEnum.ExpressionNormal
                },
                {
                    str: '0 + 3',
                    elementType: ElementTypeEnum.ExpressionNormal
                },
                {
                    str: '4 - 1',
                    elementType: ElementTypeEnum.ExpressionNormal
                }
            ],
            answers: [
                {
                    str: '3',
                    elementType: ElementTypeEnum.ExpressionNormal
                }
            ],
            elementType: ElementTypeEnum.ProblemEquationSelectAnswerSingle
        });
        this.seedProblems.set('problemEquationSelectAnswerSingleOptionNumber', problemEquationSelectAnswerSingleOptionNumber);

        // 02: Create a problemEquationSelectAnswerSingle OptionExpression
        const problemEquationSelectAnswerSingleOptionExpression = this.createAModelByConfig({
            equation: {
                leftExpression: '3',
                rightExpression: '1 + 2',
                blankSide: EquationSideEnum.Right
            },
            options: ['1 + 2', '2 + 3', '1 + 3'],
            answers: ['1 + 2'],
            elementType: ElementTypeEnum.ProblemEquationSelectAnswerSingle
        });
        this.seedProblems.set('problemEquationSelectAnswerSingleOptionExpression', problemEquationSelectAnswerSingleOptionExpression);

        // 03: Create a problemEquationSelectAnswerSingle OptionExpression Multiple
        const problemEquationSelectAnswerSingleOptionExpressionMultiple = this.createAModelByConfig({
            equation: {
                leftExpression: '4',
                rightExpression: '2 + 2',
                blankSide: EquationSideEnum.Right
            },
            options: ['4 + 0', '1 + 3', '2 + 1'],
            answers: ['4 + 0', '1 + 3'],
            elementType: ElementTypeEnum.ProblemEquationSelectAnswerMultiple
        });
        this.seedProblems.set('problemEquationSelectAnswerSingleOptionExpressionMultiple', problemEquationSelectAnswerSingleOptionExpressionMultiple);
    }
}