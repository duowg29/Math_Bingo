import { Orientation } from "../enums/Orientation";
import { BaseProgressBarModelView } from "./BaseProgressBarModelView";

export class LinearProgressBarModelView extends BaseProgressBarModelView {
    private _progress: number;
    private _width: number;
    private _height: number;
    private _orientation: Orientation;
    private _direction: any;
    
    constructor(
      x: number,
      y: number,
      width: number,
      height: number,
      backgroundColor: string ,
      fillColor: string,
      borderRadius: number = 5,
      duration: number = 2000,
      progress: number = 0,
      orientation: Orientation = Orientation.HORIZONTAL,
      direction: any = null
    ) {
      super(x, y, backgroundColor, fillColor, borderRadius, duration);
      this._width = width;
      this._height = height;
      this._progress = progress;
      this._orientation = orientation;
      this._direction = direction;
    }


    /**
     * Getter direction
     * @return {any}
     */
	public get direction(): any {
		return this._direction;
	}

    /**
     * Setter direction
     * @param {any} value
     */
	public set direction(value: any) {
		this._direction = value;
	}

      /**
       * Getter progress
       * @return {number}
       */
    public get progress(): number {
      return this._progress;
    }

      /**
       * Getter width
       * @return {number}
       */
    public get width(): number {
      return this._width;
    }

      /**
       * Getter height
       * @return {number}
       */
    public get height(): number {
      return this._height;
    }

      /**
       * Getter orientation
       * @return {Orientation}
       */
    public get orientation(): Orientation {
      return this._orientation;
    }

      /**
       * Setter progress
       * @param {number} value
       */
    public set progress(value: number) {
      this._progress = value;
    }

      /**
       * Setter width
       * @param {number} value
       */
    public set width(value: number) {
      this._width = value;
    }

      /**
       * Setter height
       * @param {number} value
       */
    public set height(value: number) {
      this._height = value;
    }

      /**
       * Setter orientation
       * @param {Orientation} value
       */
    public set orientation(value: Orientation) {
      this._orientation = value;
    }
  
}

export { Orientation };
  