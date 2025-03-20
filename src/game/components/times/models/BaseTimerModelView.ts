export class BaseTimerModelView{
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;
    private _fontSize: number;
    private _fontColor: string;
    private _backgroundColor: string;

	constructor(x: number, y: number, width: number, height: number, fontSize: number, fontColor: string, backgroundColor: string) {
		this._x = x;
		this._y = y;
		this._width = width;
		this._height = height;
		this._fontSize = fontSize;
		this._fontColor = fontColor;
		this._backgroundColor = backgroundColor;
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
     * Getter fontSize
     * @return {number}
     */
	public get fontSize(): number {
		return this._fontSize;
	}

    /**
     * Getter fontColor
     * @return {string}
     */
	public get fontColor(): string {
		return this._fontColor;
	}

    /**
     * Getter backgroundColor
     * @return {string}
     */
	public get backgroundColor(): string {
		return this._backgroundColor;
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
     * Setter fontSize
     * @param {number} value
     */
	public set fontSize(value: number) {
		this._fontSize = value;
	}

    /**
     * Setter fontColor
     * @param {string} value
     */
	public set fontColor(value: string) {
		this._fontColor = value;
	}

    /**
     * Setter backgroundColor
     * @param {string} value
     */
	public set backgroundColor(value: string) {
		this._backgroundColor = value;
	}

}