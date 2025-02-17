import { ElementModel } from "../math/components/models/ElementModel";

export interface IFactory {
    createARandomModel(): ElementModel;
    createTestModels(): ElementModel [];
    createAModelByString(str: string, options: any): ElementModel;
    createAModelByConfig(config: any): ElementModel;
}