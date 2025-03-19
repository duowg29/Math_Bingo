import Phaser from "phaser";
import { CircularProgressBarModelView } from "../models/CircularProgressBarModelView";
import { BaseProgressBarModel } from "../models/BaseProgressBarModel";

export class CircularProgressBarView extends Phaser.GameObjects.Container {
  private modelView: CircularProgressBarModelView;
  private model: BaseProgressBarModel;
  private backgroundCircle: Phaser.GameObjects.Graphics;
  private fillCircle: Phaser.GameObjects.Graphics;
  private lineWidth: number = 18;

  constructor(scene: Phaser.Scene, model: BaseProgressBarModel, modelView: CircularProgressBarModelView) {
    super(scene, modelView.x, modelView.y);
    this.model = model;
    this.modelView = modelView;
    this.backgroundCircle = this.scene.add.graphics();
    this.fillCircle = this.scene.add.graphics();
  
    // Đặt origin bằng cách di chuyển Graphics về tâm
    this.backgroundCircle.setPosition(this.modelView.radius, this.modelView.radius);
    this.fillCircle.setPosition(this.modelView.radius,this.modelView.radius);
  
    this.createProgressBar();
    this.model.onChange = this.updateFillCircle.bind(this);
  
    scene.add.existing(this);
  }
  

  private createProgressBar(): void {
    this.backgroundCircle.clear();
    this.backgroundCircle.lineStyle(this.lineWidth, parseInt(this.modelView.backgroundColor, 16));
    this.backgroundCircle.arc(0, 0, this.modelView.radius, 0, Phaser.Math.PI2, false);
    this.backgroundCircle.strokePath();
    this.add(this.backgroundCircle);

    this.fillCircle.clear();
    this.fillCircle.lineStyle(this.lineWidth, parseInt(this.modelView.fillColor, 16), 1);
    this.add(this.fillCircle);
  }

  private updateFillCircle(): void {
    this.fillCircle.clear();
    this.fillCircle.lineStyle(this.lineWidth, parseInt(this.modelView.fillColor, 16), 1);

    const radius = this.modelView.radius;
    const startAngle = Phaser.Math.DegToRad(270);
    const endAngle = startAngle + Phaser.Math.PI2 * (this.model.percentage / 100);

    this.fillCircle.beginPath();
    this.fillCircle.arc(0, 0, radius, startAngle, endAngle, false);
    this.fillCircle.strokePath();

    const startX = Math.cos(startAngle) * radius;
    const startY = Math.sin(startAngle) * radius;
    const endX = Math.cos(endAngle) * radius;
    const endY = Math.sin(endAngle) * radius;

    this.fillCircle.fillStyle(parseInt(this.modelView.fillColor, 16), 1);
    if (this.model.percentage > 0) {
      this.fillCircle.fillCircle(startX, startY, this.lineWidth / 2);
      this.fillCircle.fillCircle(endX, endY, this.lineWidth / 2);
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
      ease: "Linear",
      onUpdate: () => this.updateFillCircle(),
      onComplete: () => console.log("Progress Completed"),
    });
  }
}
