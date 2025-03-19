export class BaseTimerModel {
    private _startTime: number;
    private _endTime: number;
    private _currentTime: number;
    private onChange: (currentTime: number) => void = () => {};
  
    constructor(startTime: number, endTime: number) {
      this._startTime = startTime;
      this._endTime = endTime;
      this._currentTime = startTime;
    }
  
    public updateTime(delta: number): void {
      this._currentTime = Math.min(this._endTime, this._currentTime + delta);
      this.onChange(this._currentTime);
    }
  
    public reset(): void {
      this._currentTime = this._startTime;
      this.onChange(this._currentTime);
    }

    /**
     * Getter startTime
     * @return {number}
     */
	public get startTime(): number {
		return this._startTime;
	}

    /**
     * Getter endTime
     * @return {number}
     */
	public get endTime(): number {
		return this._endTime;
	}

    /**
     * Getter currentTime
     * @return {number}
     */
	public get currentTime(): number {
		return this._currentTime;
	}

    /**
     * Setter startTime
     * @param {number} value
     */
	public set startTime(value: number) {
		this._startTime = value;
	}

    /**
     * Setter endTime
     * @param {number} value
     */
	public set endTime(value: number) {
		this._endTime = value;
	}

    /**
     * Setter currentTime
     * @param {number} value
     */
	public set currentTime(value: number) {
		this._currentTime = value;
	}

    

    
  }
  