import { ElementModel } from "../components/models/ElementModel";
import { NumberNormalModel } from "../components/models/NumberNormalModel";
import { OperatorModel } from "../components/models/OperatorModel";
import { TextModel } from "../components/models/TextModel";
import { ElementTypeEnum } from "../components/enums/ElementTypeEnum";
import { OperatorTypeEnum } from "../components/enums/OperatorTypeEnum";
import { IFactory } from "./IFactory";
import { ExpressionModel } from "../components/models/ExpressionModel";
import { ExpressionNormalModel } from "../components/models/ExpressionNormalModel";
import { ExpressionBlankModel } from "../components/models/ExpressionBlankModel";

export class ElementFactory implements IFactory {
    createARandomModel(): ElementModel {
        const elementTypes = [ElementTypeEnum.Text, ElementTypeEnum.NumberNormal, ElementTypeEnum.Operator];
        const elementType: ElementTypeEnum = elementTypes[Math.floor(Math.random()*elementTypes.length)];

        const alphabets = ['a', 'b', 'c'];
        const operators = Object.values(OperatorTypeEnum);  

        let elementModel: ElementModel;
        switch(elementType) {
            case ElementTypeEnum.Text:
                elementModel = new TextModel(alphabets[Math.floor(Math.random()*alphabets.length)]);
                break;
            case ElementTypeEnum.NumberNormal:
                elementModel = new NumberNormalModel(Math.floor(Math.random()*10));
                break;
            case ElementTypeEnum.Operator:
                elementModel = new OperatorModel(operators[Math.floor(Math.random()*operators.length)]);
                break;
            default:
                elementModel = new TextModel('Wrong type of element');
                break;
        }

        return elementModel;
    }

    createTestModels(): ElementModel[] {
        const numbers = Array(10).fill(0);
        const operators = Object.values(OperatorTypeEnum);
        const specials = ['=', '?'];

        const models: ElementModel[] = [];

        numbers.map((_, index) => models.push(new NumberNormalModel(index)));
        operators.map(item => models.push(new OperatorModel(item)));
        specials.map(item => models.push(new TextModel(item)));
        return models;
    }

    createAModelByString(str: string): ElementModel {
        if (isNaN(Number(str))) {
            if (Object.values(OperatorTypeEnum).includes((str.trim()) as OperatorTypeEnum)) {
                return new OperatorModel(str as OperatorTypeEnum);
            } else {
                return new TextModel(str);
            }
        } else {
            return new NumberNormalModel(Number(str));
        }
    }

    createAModelByConfig(config: any): ExpressionModel {
        let elements: ElementModel[]= [];
        switch(config.problemType as ElementTypeEnum) {
            case ElementTypeEnum.ExpressionNormal:
                return new ExpressionNormalModel(elements);
            case ElementTypeEnum.ExpressionBlank:
                return new ExpressionBlankModel(elements, config.blankType, config.blankIndex);
            default:
                return new ExpressionNormalModel(elements);
        }
    }
}