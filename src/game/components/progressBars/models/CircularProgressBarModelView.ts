import { BaseProgressBarModelView } from "./BaseProgressBarModelView";

export class CircularProgressBarModelView extends BaseProgressBarModelView {
    private _progress: number;
    private _radius: number;

    constructor(
      x: number,
      y: number,
      backgroundColor: string,
      fillColor: string,
      borderRadius: number = 5,
      duration: number = 2000,
      progress: number = 0,
      radius: number
    ) {
      super(x, y, backgroundColor, fillColor, borderRadius, duration);
      this._progress = progress;
      this._radius = radius;
    }

    /**
     * Getter progress
     * @return {number}
     */
    public get progress(): number {
        return this._progress;
    }

    /**
     * Setter progress
     * @param {number} value
     */
    public set progress(value: number) {
        this._progress = value;
    }

    /**
     * Getter radius
     * @return {number}
     */
    public get radius(): number {
        return this._radius;
    }

    /**
     * Setter radius
     * @param {number} value
     */
    public set radius(value: number) {
        this._radius = value;
    }
}
