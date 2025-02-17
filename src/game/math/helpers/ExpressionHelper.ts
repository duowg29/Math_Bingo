import { ExpressionModel } from "../components/models/ExpressionModel";
import { NumberModel } from "../components/models/NumberModel";

export class ExpressionHelper {
    static validate(expression: ExpressionModel) {
        let elements = expression.elements;
        if (elements.length % 2 === 0) {
            console.log('Validate Expression: invalid element count, ' + elements.length);
            return false;
        }

        for(let i= 0; i<elements.length; i++) {
            const element = elements[i];
            if ((i%2 === 0 && !(element instanceof NumberModel)) || (i%2 !== 0 && element instanceof NumberModel)) {
                console.log('Validate Expression: Wrong type of element at index, ' +  typeof(element) + ' at ' + i);
                return false;
            }
        }
        return true;
    }

    static calculate(expression: ExpressionModel) {
        return eval(expression.toString());
    }
}