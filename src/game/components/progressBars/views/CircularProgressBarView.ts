import Phaser from "phaser";
import { CircularProgressBarModelView } from "../models/CircularProgressBarModelView";

export class CircularProgressBarView extends Phaser.GameObjects.Container {
  private modelView: CircularProgressBarModelView;
  private backgroundCircle: Phaser.GameObjects.Graphics;
  private fillCircle: Phaser.GameObjects.Graphics;
  private lineWith: number = 6;

  constructor(scene: Phaser.Scene, modelView: CircularProgressBarModelView) {
    super(scene, modelView.x, modelView.y);
    this.modelView = modelView;
    this.backgroundCircle = this.scene.add.graphics();
    this.fillCircle = this.scene.add.graphics();

    this.createProgressBar();
    scene.add.existing(this);
  }

  private createProgressBar(): void {

    this.backgroundCircle.clear();
    this.backgroundCircle.lineStyle(this.lineWith, 0x808080, 0.5);
    this.backgroundCircle.arc(0, 0, this.modelView.radius, 0, Phaser.Math.PI2, false);
    this.backgroundCircle.strokePath();
    this.add(this.backgroundCircle);

    this.fillCircle.clear();
    this.fillCircle.lineStyle(this.lineWith, parseInt(this.modelView.backgroundColor), 1);
    this.add(this.fillCircle);
  }

  public startProgress(): void {
    this.modelView.progress = 0;
    this.scene.tweens.add({
      targets: this,
      progress: 1,
      duration: this.modelView.duration,
      ease: "Linear",
      onUpdate: () => this.updateFillCircle(),
      onComplete: () => console.log("Progress Completed"),
    });
  }

  private updateFillCircle(): void {
    this.fillCircle.clear();
    
    this.fillCircle.lineStyle(this.lineWith, parseInt(this.modelView.backgroundColor, 16), 1);

    const radius = this.modelView.radius;
    const startAngle = Phaser.Math.DegToRad(270);
    const endAngle = startAngle + Phaser.Math.PI2 * this.modelView.progress;

    // Vẽ vòng cung
    this.fillCircle.beginPath();
    this.fillCircle.arc(0, 0, radius, startAngle, endAngle, false);
    this.fillCircle.strokePath();

    const startX = Math.cos(startAngle) * radius;
    const startY = Math.sin(startAngle) * radius;
    const endX = Math.cos(endAngle) * radius;
    const endY = Math.sin(endAngle) * radius;

    this.fillCircle.fillStyle(parseInt(this.modelView.backgroundColor, 16), 1);

    const capRadius = this.lineWith / 2;
    // Vẽ đầu bo tròn
    this.fillCircle.fillCircle(startX, startY, capRadius);
    this.fillCircle.fillCircle(endX, endY, capRadius);
  }

}
