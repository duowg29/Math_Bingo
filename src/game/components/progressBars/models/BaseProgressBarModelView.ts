export class BaseProgressBarModelView {
    private _x: number;
    private _y: number;
    private _backgroundColor: string;
    private _fillColor: string;
    private _borderRadius: number;
    private _duration: number;
    
    constructor(
      x: number, 
      y: number,
      backgroundColor: string , 
      fillColor: string,
      borderRadius: number = 5,
      duration: number = 1000
    ) {
      this._x = x;
      this._y = y;
      this._backgroundColor = backgroundColor;
      this._fillColor = fillColor;
      this._borderRadius = borderRadius;
      this._duration = duration;
    }

    /**
     * Getter x
     * @return {number}
     */
	public get x(): number {
		return this._x;
	}

    /**
     * Getter y
     * @return {number}
     */
	public get y(): number {
		return this._y;
	}



    /**
     * Getter borderRadius
     * @return {number}
     */
	public get borderRadius(): number {
		return this._borderRadius;
	}

    /**
     * Getter duration
     * @return {number}
     */
	public get duration(): number {
		return this._duration;
	}

    /**
     * Setter x
     * @param {number} value
     */
	public set x(value: number) {
		this._x = value;
	}

    /**
     * Setter y
     * @param {number} value
     */
	public set y(value: number) {
		this._y = value;
	}

    /**
     * Setter borderRadius
     * @param {number} value
     */
	public set borderRadius(value: number) {
		this._borderRadius = value;
	}

    /**
     * Setter duration
     * @param {number} value
     */
	public set duration(value: number) {
		this._duration = value;
	}


    /**
     * Getter backgroundColor
     * @return {string}
     */
	public get backgroundColor(): string {
		return this._backgroundColor;
	}

    /**
     * Getter fillColor
     * @return {string}
     */
	public get fillColor(): string {
		return this._fillColor;
	}

    /**
     * Setter backgroundColor
     * @param {string} value
     */
	public set backgroundColor(value: string) {
		this._backgroundColor = value;
	}

    /**
     * Setter fillColor
     * @param {string} value
     */
	public set fillColor(value: string) {
		this._fillColor = value;
	}


    
  }
  