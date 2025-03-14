import { BaseButton, ButtonConfig } from "./BaseButton";

export class ImageButton extends BaseButton {
    private buttonImage: Phaser.GameObjects.Image;

    constructor(config: ButtonConfig) {
      super(config);
  
      if (!config.imageKey) {
        throw new Error("imageKey is required for ImageButton");
      }
  
      this.buttonImage = config.scene.add.image(0, 0, config.imageKey);
      this.buttonImage.setDisplaySize(config.width || 100, config.height || 50);
      this.add(this.buttonImage);
  
      if (this.buttonText) {
        this.bringToTop(this.buttonText);
      }
    }
  }
   