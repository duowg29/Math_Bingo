import Phaser from 'phaser';

export type ProgressBarConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width?: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  borderColor?: string;
  borderWidth?: number;
  duration?: number; 
  text?: string;
  fontStyle?: string;
  fontSize?: number;
  textColor?: string;
  padding?: number;
};

export class BaseProgressBar extends Phaser.GameObjects.Container {
  private barBackground: Phaser.GameObjects.Graphics;
  private barFill: Phaser.GameObjects.Graphics;
  private progressText?: Phaser.GameObjects.Text;
  private progress: number = 0;
  protected barWidth: number;
  protected barHeight: number;
  private borderRadius: number = 8;
  private duration: number;

  constructor(config: ProgressBarConfig) {
    super(config.scene, config.x, config.y);
    config.scene.add.existing(this);

    this.barWidth = config.width || 200;
    this.barHeight = config.height || 20;
    this.duration = config.duration || 2000;

    this.barBackground = config.scene.add.graphics();
    this.barBackground.fillStyle(Phaser.Display.Color.HexStringToColor(config.backgroundColor || '#D3D3D3').color, 1).setAlpha(0.5);
    this.barBackground.fillRoundedRect(-this.barWidth / 2, -this.barHeight / 2, this.barWidth, this.barHeight, this.borderRadius);

    // if (config.borderColor) {
    //   this.barBackground.lineStyle(config.borderWidth || 2, Phaser.Display.Color.HexStringToColor(config.borderColor).color, 1);
    //   this.barBackground.strokeRoundedRect(-this.barWidth / 2, -this.barHeight / 2, this.barWidth, this.barHeight, this.borderRadius);
    // }

    // if (config.borderColor) {
    //   const borderWidth = config.borderWidth || 2;
      
    //   this.barBackground.lineStyle(borderWidth, Phaser.Display.Color.HexStringToColor(config.borderColor).color, 1);
    //   this.barBackground.strokeRoundedRect(
    //     -this.barWidth / 2 - borderWidth / 2, // Đẩy viền ra ngoài
    //     -this.barHeight / 2 - borderWidth / 2, // Đẩy viền ra ngoài
    //     this.barWidth + borderWidth, // Tăng kích thước theo viền
    //     this.barHeight + borderWidth, // Tăng kích thước theo viền
    //     this.borderRadius
    //   );
    // }
    

    this.add(this.barBackground);

    this.barFill = config.scene.add.graphics();
    this.barFill.fillStyle(Phaser.Display.Color.HexStringToColor(config.progressColor || '#00ff00').color, 1);
    this.add(this.barFill);

    if (config.text) {
      this.progressText = config.scene.add.text(0, 0, "0%", {
        fontFamily: config.fontStyle || 'Arial',
        fontSize: (config.fontSize || 16) + 'px',
        color: config.textColor || '#000000',
        padding: { left: config.padding || 5, right: config.padding || 5 }
      }).setOrigin(0.5);
      this.add(this.progressText);
    }

    this.updateProgress(0);
  }

  private updateProgress(value: number) {
    this.progress = Phaser.Math.Clamp(value, 0, 100);

    this.barFill.clear();
    this.barFill.fillStyle(Phaser.Display.Color.HexStringToColor("#00ff00").color, 1);
    
    this.barFill.fillRoundedRect(-this.barWidth / 2, -this.barHeight / 2, (this.barWidth * this.progress) / 100, this.barHeight, this.borderRadius);

    if (this.progressText) {
      this.progressText.setText(`${Math.floor(this.progress)}%`);
    }
  }

  public startProgress() {
    this.scene.tweens.add({
      targets: this,
      progress: 100,
      duration: this.duration,
      ease: 'Linear',
      onUpdate: () => this.updateProgress(this.progress),
      onComplete: () => console.log("Progress completed!"),
    });
  }
}
