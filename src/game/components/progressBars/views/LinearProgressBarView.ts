import Phaser from 'phaser';
import { BaseProgressBarModel } from '../models/BaseProgressBarModel';
import { LinearProgressBarModelView, Orientation} from '../models/LinearProgressBarModelView';
import { colorMap } from '../../key-value/Color';

export class LinearProgressBarView extends Phaser.GameObjects.Container {
  public model: BaseProgressBarModel;
  public modelView: LinearProgressBarModelView;
  private backgroundBar: Phaser.GameObjects.Graphics;
  private fillBar: Phaser.GameObjects.Graphics;
  private thumbBorder: Phaser.GameObjects.Graphics;
  private thumbInner: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, model: BaseProgressBarModel, modelView: LinearProgressBarModelView) {
    super(scene, modelView.x, modelView.y);
    this.model = model;
    this.modelView = modelView;

    this.createProgressBar();
    // this.createThumb()

    if (this.modelView.orientation === Orientation.VERTICAL) {
      this.angle = -90;
    }
    
    this.model.onChange = this.updateProgressBar.bind(this);

    scene.add.existing(this);
  }

  private createProgressBar(): void {
    this.backgroundBar = this.scene.add.graphics();
    this.backgroundBar.fillStyle(parseInt(this.modelView.backgroundColor), 1);
    this.backgroundBar.fillRoundedRect(0, -this.modelView.height / 2, this.modelView.width, this.modelView.height, this.modelView.borderRadius);

    this.fillBar = this.scene.add.graphics();
    this.fillBar.fillStyle(parseInt(this.modelView.fillColor), 1);
    this.fillBar.fillRect(0, -this.modelView.height / 2, 0, this.modelView.height);

    this.add([this.backgroundBar, this.fillBar]);
  }

  private createThumb(): void {
    const radius = this.modelView.height / 2; 
    const borderWidth = 12; 
    const innerRadius = this.modelView.height / 2; 
  
    this.thumbBorder = this.scene.add.graphics();
    this.thumbBorder.lineStyle(borderWidth, Number(colorMap.black),);
    this.thumbBorder.strokeCircle(0, 0, radius);
    this.add(this.thumbBorder);
  
    this.thumbInner = this.scene.add.graphics();
    this.thumbInner.fillStyle(parseInt(this.modelView.fillColor), 1);
    this.thumbInner.fillCircle(0, 0, innerRadius);
    this.add(this.thumbInner);
  
    this.thumbBorder.setPosition(0, 0);
    this.thumbInner.setPosition(0, 0);
  
    this.thumbInner.setInteractive(new Phaser.Geom.Circle(0, 0, innerRadius), Phaser.Geom.Circle.Contains);
  
    this.scene.input.setDraggable(this.thumbInner);
  
    this.thumbInner.on("pointerover", () => {
      this.scene.tweens.add({
        targets: this.thumbInner,
        scale: 1.2, 
        duration: 100,
      });
    });

    this.thumbInner.on("pointerout", () => {
      this.scene.tweens.add({
        targets: this.thumbInner,
        scale: 1, 
        duration: 100,
      });
    });

  
    this.scene.input.on("drag", (pointer: any, gameObject: any, dragX: any, dragY: any) => {
      if (gameObject === this.thumbInner) {
        const minX = 0;
        const maxX = this.modelView.width;
        const newX = Phaser.Math.Clamp(dragX, minX, maxX);
  
        this.thumbBorder.setX(newX);
        this.thumbInner.setX(newX);
  
        this.model.value = (newX / this.modelView.width) * this.model.max;
        this.updateProgressBar();
        console.log("Current Value:", this.model.value.toFixed(2));

      }
    });
  }

  private updateProgressBar(): void {
    const progressWidth = (this.model.percentage / 100) * this.modelView.width;

    this.fillBar.clear();
    this.fillBar.fillStyle(parseInt(this.modelView.fillColor), 1);
    this.fillBar.fillRoundedRect(0, -this.modelView.height / 2, progressWidth, this.modelView.height, this.modelView.borderRadius);

    if (this.thumbBorder && this.thumbInner) {
      this.thumbBorder.setX(progressWidth);
      this.thumbInner.setX(progressWidth);
  }
  }

  public setProgress(value: number): void {
    this.model.value = value;
  }

  public startProgress(): void {
    this.scene.tweens.add({
      targets: this.model,
      value: this.model.max,        
      duration: this.modelView.duration,
      ease: 'Linear',
      onUpdate: () => this.updateProgressBar(),
      onComplete: () => console.log("Progress completed!")
    });
  }
}
