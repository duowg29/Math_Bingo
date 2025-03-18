import Phaser from 'phaser';
import { BaseProgressBarModel } from '../models/BaseProgressBarModel';
import { LinearProgressBarModelView, Orientation} from '../models/LinearProgressBarModelView';

export class LinearProgressBarView extends Phaser.GameObjects.Container {
  public model: BaseProgressBarModel;
  public modelView: LinearProgressBarModelView;
  private backgroundBar: Phaser.GameObjects.Graphics;
  private fillBar: Phaser.GameObjects.Graphics;

  constructor(scene: Phaser.Scene, model: BaseProgressBarModel, modelView: LinearProgressBarModelView) {
    super(scene, modelView.x, modelView.y);
    this.model = model;
    this.modelView = modelView;

    this.createProgressBar();

    if (this.modelView.orientation === Orientation.VERTICAL) {
      this.angle = -90;
    }
    
    this.model.onChange = this.updateProgressBar.bind(this);

    scene.add.existing(this);
  }

  private createProgressBar(): void { 
    // Thanh nền
    this.backgroundBar = this.scene.add.graphics();
    this.backgroundBar.fillStyle(0xcccccc, 1);
    this.backgroundBar.fillRoundedRect(0, -this.modelView.height / 2, this.modelView.width, this.modelView.height, this.modelView.borderRadius);

    // Thanh tiến trình
    this.fillBar = this.scene.add.graphics();
    this.fillBar.fillStyle(parseInt(this.modelView.backgroundColor), 1);
    this.fillBar.fillRoundedRect(0, -this.modelView.height / 2, 0, this.modelView.height, this.modelView.borderRadius);

    this.add([this.backgroundBar, this.fillBar]);
  }

  private updateProgressBar(): void {
    const progressWidth = (this.model.percentage / 100) * this.modelView.width;

    this.fillBar.clear();
    this.fillBar.fillStyle(parseInt(this.modelView.backgroundColor), 1);
    this.fillBar.fillRoundedRect(0, -this.modelView.height / 2, progressWidth, this.modelView.height, this.modelView.borderRadius);
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
