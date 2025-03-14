import { ElementModel} from "./ElementModel";
import { ElementTypeEnum } from "../enums/ElementTypeEnum";

export class TextModel extends ElementModel {

    text: string;

    constructor(text: string) {
        super(ElementTypeEnum.Text);
        this.text = text;
    }

    toString() {
        return this.text;
    }
}