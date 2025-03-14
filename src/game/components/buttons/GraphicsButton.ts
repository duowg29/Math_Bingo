import { BaseButton, ButtonConfig } from "./BaseButton";

export class GraphicsButton extends BaseButton {
  private buttonGraphics: Phaser.GameObjects.Graphics;
  private backgroundColor: number;

  constructor(config: ButtonConfig) {
    super(config);

    this.backgroundColor = Phaser.Display.Color.HexStringToColor(
      config.backgroundColor || "#0000ff"
    ).color;

    this.buttonGraphics = config.scene.add.graphics();
    this.addAt(this.buttonGraphics, 0); 

    this.drawShape(config);
  }

  private drawShape(config: ButtonConfig) {
    this.buttonGraphics.clear();
    this.buttonGraphics.fillStyle(this.backgroundColor, 1);

    switch (config.shape) {
      case "circle":
        this.buttonGraphics.fillCircle(0, 0, (config.width || 50) / 2);
        break;
      case "rectangle":
      case "square":
        const radius = config.borderRadius ?? 0;
        this.buttonGraphics.fillRoundedRect(
          -(config.width || 100) / 2,
          -(config.height || 50) / 2,
          config.width || 100,
          config.height || 50,
          radius
        );
        break;
      case "diamond":
        this.buttonGraphics.fillPoints(
          [
            new Phaser.Geom.Point(0, -(config.height || 50) / 2),
            new Phaser.Geom.Point((config.width || 100) / 2, 0),
            new Phaser.Geom.Point(0, (config.height || 50) / 2),
            new Phaser.Geom.Point(-(config.width || 100) / 2, 0),
          ],
          true
        );
        break;
    }

    if (this.buttonText) {
      this.bringToTop(this.buttonText);
    }
  }
}
