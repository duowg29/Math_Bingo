
import { EquationSideEnum } from "../math/components/enums/EquationSideEnum";
import { EquationModel } from "../math/components/models/EquationModel";
import { ExpressionModel } from "../math/components/models/ExpressionModel";
import { ExpressionNormalModel } from "../math/components/models/ExpressionNormalModel";
import { NumberNormalModel } from "../math/components/models/NumberNormalModel";
import { ArrayUtils } from "../math/utils/ArrrayUtils";
import { ExpressionFactory } from "./ExpressionFactory";
import { IFactory } from "./IFactory";

export class EquationFactory implements IFactory {
    expressionFactory = new ExpressionFactory();

    createARandomModel(): EquationModel {
        const expression = this.expressionFactory.createARandomModel();
        return this.createEquationFromExpression(expression);
    }

    createTestModels(): EquationModel[] {
        const expressionModels = this.expressionFactory.createTestModels();
        const blankSize = ArrayUtils.getRandomItem(Object.values(EquationSideEnum));
        const equationModel = new EquationModel(expressionModels[0], expressionModels[1], blankSize);

        const equationModels: EquationModel[] = [];
        equationModels.push(equationModel)
        return equationModels;
    }

    createEquationFromExpression(expression: ExpressionModel, isReverse: boolean = false) { // Left expression = Right number
        expression = expression ? expression : this.expressionFactory.createARandomModel();
        const numberModel = new NumberNormalModel(expression.caculate());
        const numberExpression = new ExpressionNormalModel([numberModel]);
        const blankSize = ArrayUtils.getRandomItem(Object.values(EquationSideEnum));
        if (isReverse) {
            return new EquationModel(numberExpression, expression, blankSize);
        }
        return new EquationModel(expression, numberExpression, blankSize);
    }

    createAModelByString(str: string): EquationModel {
        const strArr = str.split('=')
        const leftExpression = this.expressionFactory.createAModelByString(strArr[0]);
        const rightExpression = this.expressionFactory.createAModelByString(strArr[1]);
        let blankSide = ArrayUtils.getRandomItem(Object.values(EquationSideEnum));
        return new EquationModel(leftExpression, rightExpression, blankSide);
    }

    createAModelByConfig(config: any): EquationModel {
        const leftExpression = this.expressionFactory.createAModelByString(config.leftExpression);
        const rightExpression = this.expressionFactory.createAModelByString(config.rightExpression);
        return new EquationModel(leftExpression, rightExpression, config.blankSide);
    }
}