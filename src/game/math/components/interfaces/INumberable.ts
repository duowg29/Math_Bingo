export interface INumberable<T> {
    add(other: T): T;
    
    subtract(other: T): T;
    
    multiple(other: T): T;
    
    divide(other: T): T;
}