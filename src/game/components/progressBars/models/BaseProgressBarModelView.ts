export class ProgressBarViewModel {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public backgroundColor: number;
    public fillColor: number;
    public borderRadius: number;
    public smoothTransition: boolean;
    public duration: number;
    
    constructor(
      x: number, 
      y: number, 
      width: number, 
      height: number, 
      backgroundColor: number = 0x000000, 
      fillColor: number = 0x00ff00,
      borderRadius: number = 5,
      smoothTransition: boolean = true,
      duration: number = 1000
    ) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.backgroundColor = backgroundColor;
      this.fillColor = fillColor;
      this.borderRadius = borderRadius;
      this.smoothTransition = smoothTransition;
      this.duration = duration;
    }
  }
  