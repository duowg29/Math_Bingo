export  class BaseProgressBarModel {
    private _min: number;
    private _max: number;
    private _value: number;
    private _onChange: (value: number, percentage: number) => void;
  
    constructor(min: number, max: number, initialValue: number, onChange?: (value: number, percentage: number) => void) {
      this._min = min;
      this._max = max;
      this._value = Phaser.Math.Clamp(initialValue, min, max);
      this._onChange = onChange || (() => {});
    }
  
    get value(): number {
      return this._value;
    }
  
    get percentage(): number {
      return ((this._value - this._min) / (this._max - this._min)) * 100;
    }
  
    set value(newValue: number) {
      this._value = Phaser.Math.Clamp(newValue, this._min, this._max);
      this._onChange(this._value, this.percentage);
  }
  
  
  
    set onChange(callback: (value: number, percentage: number) => void) {
      this._onChange = callback;
    }


      /**
       * Getter min
       * @return {number}
       */
    public get min(): number {
      return this._min;
    }

      /**
       * Getter max
       * @return {number}
       */
    public get max(): number {
      return this._max;
    }

      /**
       * Setter min
       * @param {number} value
       */
    public set min(value: number) {
      this._min = value;
    }

      /**
       * Setter max
       * @param {number} value
       */
    public set max(value: number) {
      this._max = value;
    }
}
  