

import Phaser from 'phaser';

export type ButtonConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  fontStyle?: string;
  fontSize?: number;
  textColor?: string;
  padding?: number;
  borderColor?: string;
  backgroundColor?: string;
  cursor?: string;
  shape?: 'rectangle' | 'circle' | 'square' | 'diamond';
  borderRadius?: number;
  imageKey?: string;
  iconKey?: string;
  onClick?: () => void;
};

export class BaseButton extends Phaser.GameObjects.Container {
  protected buttonText?: Phaser.GameObjects.Text;
  private defaultTextColor: string;
  private isAnimating: boolean = false;

  constructor(config: ButtonConfig) {
    super(config.scene, config.x, config.y);
    config.scene.add.existing(this);

    this.defaultTextColor = config.textColor || "#ffffff";

    if (config.text) {
      this.buttonText = config.scene.add.text(0, 0, config.text, {
        fontFamily: config.fontStyle || "Arial",
        fontSize: (config.fontSize || 20) + "px",
        color: this.defaultTextColor,
        padding: { left: config.padding || 10, right: config.padding || 10 },
      }).setOrigin(0.5);
      this.add(this.buttonText);
    }

    this.setSize(config.width || 100, config.height || 50);
    this.setInteractive({ useHandCursor: config.cursor !== undefined ? true : false });

    this.on("pointerover", () => {
      this.setAlpha(0.7);
      // fix cứng default khi hover vào
      this.buttonText?.setColor("#000000");
    });

    this.on("pointerout", () => {
      this.setAlpha(1);
      this.buttonText?.setColor(this.defaultTextColor);
    });

    this.on("pointerup", () => {
      if (this.isAnimating) return;
    
      this.isAnimating = true;
    
      if (config.onClick) {
        const isCorrect = config.onClick();
    
        if (typeof isCorrect === "boolean" && !isCorrect) {
          this.scene.tweens.add({
            targets: this,
            x: this.x + 5,
            duration: 50,
            yoyo: true,
            repeat: 5,
            onComplete: () => {
              this.isAnimating = false;
            },
          });
        } else {
          this.scene.tweens.add({
            targets: this,
            scale: 0.9,
            duration: 100,
            yoyo: true,
            onComplete: () => {
              this.isAnimating = false;
            },
          });
        }
      }
    });
    
    
  }
}
