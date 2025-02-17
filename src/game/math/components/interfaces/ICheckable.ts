import { ICalculatable } from "./ICalculatable";
import { CheckResponse } from "../models/CheckResponse";

export interface ICheckable {
    check(dataToCheck: ICalculatable[]): CheckResponse;
}