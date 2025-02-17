import { ElementTypeEnum } from "../components/enums/ElementTypeEnum";
import { OperatorTypeEnum } from "../components/enums/OperatorTypeEnum";
import { ElementModel } from "../components/models/ElementModel";
import { ExpressionBlankModel } from "../components/models/ExpressionBlankModel";
import { ExpressionModel } from "../components/models/ExpressionModel";
import { ExpressionNormalModel } from "../components/models/ExpressionNormalModel";
import { NumberModel } from "../components/models/NumberModel";
import { NumberNormalModel } from "../components/models/NumberNormalModel";
import { OperatorModel } from "../components/models/OperatorModel";
import { ElementFactory } from "./ElementFactory";
import { IFactory } from "./IFactory";

export class ExpressionFactory implements IFactory {
    createARandomModel(): ExpressionModel {
        const elementFactory = new ElementFactory();

        const expressionElementCount = Math.floor(Math.random() * 4);
        const elementModels: ElementModel[] = [];
        for (let i = 0; i < expressionElementCount; i++) {
            const elementModel = elementFactory.createARandomModel();
            elementModels.push(elementModel);
        }
        const expressionModel = new ExpressionNormalModel(elementModels);
        return expressionModel;
    }

    createTestModels(): ExpressionModel[] {
        const elementFactory = new ElementFactory();

        const allTestElementModels = elementFactory.createTestModels();
        const elementModels1: ElementModel[] = [allTestElementModels[1], allTestElementModels[10], allTestElementModels[2]];
        const expressionModel1 = new ExpressionNormalModel(elementModels1);
        const elementModels2: ElementModel[] = [allTestElementModels[4], allTestElementModels[11], allTestElementModels[3]];
        const expressionModel2 = new ExpressionNormalModel(elementModels2);

        const expressionModels: ExpressionModel[] = [];
        expressionModels.push(expressionModel1, expressionModel2);

        return expressionModels;
    }

    createAModelByString(str: string): ExpressionModel {
        let elementStrs: string[] = str.split('');
        let validStrs: string[] = [];
        let currentStr = '';
        let operatorStrs = Object.values(OperatorTypeEnum);
        elementStrs.forEach(element => {
            if (element === ' ') return; // If the character is a space => do nothing
            if (operatorStrs.includes(element as OperatorTypeEnum)) { // If the character is in operator list => init new number
                validStrs.push(currentStr);
                validStrs.push(element);
                currentStr = '';
                return;
            }  
            currentStr += element;
        });
        validStrs.push(currentStr); // Push the last number

        const elements: ElementModel[] = [];
        let elementModel: ElementModel;
        validStrs.forEach(element => {
            if (isNaN(Number(element))) {
                elementModel = new OperatorModel(element as OperatorTypeEnum);
            } else {
                elementModel = new NumberNormalModel(Number(element));
            }
            elements.push(elementModel);
        });
        const expression = new ExpressionNormalModel(elements);
        return expression;
    }

    createAModelByConfig(config: any): ExpressionModel {
        if (typeof(config) === 'string') {
            let model = this.createAModelByString(config);
            return model;
        }
        let model = this.createAModelByString(config.str);
        switch(config.elementType) {
            case ElementTypeEnum.ExpressionNormal:
                break;
            case ElementTypeEnum.ExpressionBlank:
                model = new ExpressionBlankModel(model.elements, config.blankType, config.blankIndex);
                break;
            default:
                break;
        }
        return model;
    }

    createAModelByTemplate(template: ExpressionModel, isEvalEqualToTemplate: boolean): ExpressionNormalModel {
        return isEvalEqualToTemplate ? this.createAModelByTemplateNotEvalEqual(template) : this.createAModelByTemplateNotEvalEqual(template);
    }

    createAModelByTemplateNotEvalEqual(template: ExpressionModel): ExpressionNormalModel {
        let newElements: ElementModel[] = [];
        for (let i = 0; i < template.elements.length; i++) {
            if (i % 2 === 0) {
                const iNumberValue = (template.elements[i] as NumberModel).value;
                const newElement = new NumberNormalModel(iNumberValue + Math.round(Math.random() * iNumberValue - Math.random() * iNumberValue));
                newElements.push(newElement);
            } else {
                newElements.push(template.elements[i]);
            }
        }
        let expression = new ExpressionNormalModel(newElements);
        while(expression.caculate() === template.caculate()) {
            expression = this.createAModelByTemplateNotEvalEqual(template);
        }
        return expression;
    }

    createAModelByTemplateEvalEqual(template: ExpressionModel): ExpressionNormalModel {
        const expression = this.createAModelByTemplateNotEvalEqual(template);
        const templateEval = template.caculate();
        const notEvalEqualModelEval = expression.caculate();
        expression.elements[0] = (expression.elements[0] as NumberModel).add(new NumberNormalModel(templateEval - notEvalEqualModelEval));
        return expression;
    }
}