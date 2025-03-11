import Phaser from "phaser";
import { ButtonConfig } from "./BaseButton";
import { GraphicsButton } from "./GraphicsButton";
import { ImageButton } from "./ImageButton";

type ListButtonConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  buttonConfigs: ButtonConfig[];
  orientation?: "horizontal" | "vertical";
  spacing?: number;
  aligin: "between" | "around" | "evenly"
};

export class ListButton extends Phaser.GameObjects.Container {
  private border: Phaser.GameObjects.Rectangle;
  private buttons: Phaser.GameObjects.Container[] = [];

  constructor(config: ListButtonConfig) {
    super(config.scene, config.x, config.y);
    config.scene.add.existing(this);

    this.createButtons(config);

    this.createBorder(config);

  }

  public static calculateSpacing(buttons: ButtonConfig[], aligin: string, containerWidth: number): ButtonConfig[] {
    let totalButtonWidth = 0;
    buttons.map((i) => totalButtonWidth += i.width);
    let remainingSpace = containerWidth - totalButtonWidth;
    let spaceBetweenButtons = 0;
    let usedSpace = 0;

    switch(aligin) {
      case 'between':
        spaceBetweenButtons = remainingSpace / (buttons.length - 1);
        usedSpace = 0;
        break;
      case 'around': 
        spaceBetweenButtons = remainingSpace / buttons.length;
        usedSpace = spaceBetweenButtons/2;
        break;
      case 'evenly': 
        spaceBetweenButtons = remainingSpace / (buttons.length + 1);
        usedSpace = spaceBetweenButtons;
        break;
    }

    buttons.forEach((buttonConfig, index) => {
      buttonConfig.x = usedSpace + index * spaceBetweenButtons;
      buttonConfig.y = 100; // todo: fix it
      usedSpace += buttonConfig.width; 
    });
    return buttons;
  }

  private createButtons(config: ListButtonConfig) {
    const spacing = config.spacing || 10;
    const padding = 20; 
    const { width, height } = this.getContainerSize(config);
    
    let offset = padding;  
    const totalButtons = config.buttonConfigs.length;

    config.buttonConfigs = ListButton.calculateSpacing(config.buttonConfigs, config.aligin, 1000);
    config.buttonConfigs.forEach((btnConfig, index) => {
        let button: Phaser.GameObjects.Container;

        if (btnConfig.imageKey) {
            button = new ImageButton({ ...btnConfig, scene: config.scene });
        } else {
            button = new GraphicsButton({ ...btnConfig, scene: config.scene });
        }

        this.buttons.push(button);
        this.add(button);

      // if (totalButtons === 1) {
      //     button.x = 0;
      //     button.y = 0;
      // } else if (config.orientation === "horizontal") {
      //     button.x = -width / 2 + offset + (btnConfig.width || 100) / 2;
      //     offset += (btnConfig.width || 100) + spacing;
      // } else {
      //     button.y = -height / 2 + offset + (btnConfig.height || 50) / 2;
      //     offset += (btnConfig.height || 50) + spacing;
      // }
    });
  }

  private getContainerSize(config: ListButtonConfig): { width: number; height: number } {
    const spacing = config.spacing || 10;
    const padding = 20;  

    if (config.orientation === "horizontal") {
        const totalWidth = config.buttonConfigs.reduce((sum, btn) => sum + (btn.width || 0) + spacing, 0) - spacing;
        const maxHeight = Math.max(...config.buttonConfigs.map(btn => btn.height || 0));

        return { width: totalWidth + padding * 2, height: maxHeight + padding * 2 };
    } else {
        const totalHeight = config.buttonConfigs.reduce((sum, btn) => sum + (btn.height || 0) + spacing, 0) - spacing;
        const maxWidth = Math.max(...config.buttonConfigs.map(btn => btn.width || 0));

        return { width: maxWidth + padding * 2, height: totalHeight + padding * 2 };
    }
  } 

  private createBorder(config: ListButtonConfig) {
    const { width, height } = this.getContainerSize(config);

    this.border = this.scene.add.rectangle(0, 0, width, height, 0x000000);
    this.border.setStrokeStyle(4, 0xffffff);
    this.border.setOrigin(0.5, 0.5)

    this.add(this.border);
    this.sendToBack(this.border);
  }

}
