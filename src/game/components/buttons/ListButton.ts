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
  align: "between" | "around" | "evenly"
};

export class ListButton extends Phaser.GameObjects.Container {
  private border: Phaser.GameObjects.Rectangle;
  private buttons: Phaser.GameObjects.Container[] = [];
  private containerWidth: number = 1000;
  private containerHeight: number = 200;

  constructor(config: ListButtonConfig) {
    super(config.scene, config.x, config.y);
    config.scene.add.existing(this);
    this.createButtons(config);
    this.updateContainerSize();

  }

  public calculateHorizontalSpacing(buttons: ButtonConfig[], align: string): ButtonConfig[] {
    const n = buttons.length;
    const totalButtonWidth = buttons.reduce((sum, btn) => sum + btn.width, 0);
    const remainingSpace = this.containerWidth - totalButtonWidth;
    let spaceBetween = 0;
    let leftMargin = 0;
    
    switch (align) {
        case 'between':
            spaceBetween = n > 1 ? remainingSpace / (n - 1) : 0;
            break;
        case 'around':
            spaceBetween = n > 0 ? remainingSpace / n : 0;
            leftMargin = spaceBetween / 2;
            break;
        case 'evenly':
            spaceBetween = n > 0 ? remainingSpace / (n + 1) : 0;
            leftMargin = spaceBetween;
            break;
    }
    
    const groupWidth = totalButtonWidth + (n - 1) * spaceBetween;
    leftMargin = (this.containerWidth - groupWidth) / 2;
    
    let currentX = leftMargin + buttons[0].width / 2;
    buttons[0].x = currentX;
    buttons[0].y = this.containerHeight / 2;
    
    for (let i = 1; i < n; i++) {
        currentX = currentX + (buttons[i - 1].width / 2) + spaceBetween + (buttons[i].width / 2);
        buttons[i].x = currentX;
        buttons[i].y = this.containerHeight / 2;
    }
    
    return buttons;
  }


  public calculateVerticalSpacing(buttons: ButtonConfig[], align: string): ButtonConfig[] {
    const n = buttons.length;
    const totalButtonHeight = buttons.reduce((sum, btn) => sum + btn.height, 0);
    const remainingSpace = this.containerHeight - totalButtonHeight;
    let spaceBetween = 0;
  
    switch (align) {
        case 'between':
            spaceBetween = n > 1 ? remainingSpace / (n - 1) : 0;
            break;
        case 'around':
            spaceBetween = n > 0 ? remainingSpace / n : 0;
            break;
        case 'evenly':
            spaceBetween = n > 0 ? remainingSpace / (n + 1) : 0;
            break;
    }
  
    const groupHeight = totalButtonHeight + (n - 1) * spaceBetween;
    const topMargin = (this.containerHeight - groupHeight) / 2;
  
    let currentY = topMargin + buttons[0].height / 2;
    buttons[0].y = currentY;
    buttons[0].x = this.containerWidth / 2;
  
    for (let i = 1; i < n; i++) {
        currentY = currentY + (buttons[i - 1].height / 2) + spaceBetween + (buttons[i].height / 2);
        buttons[i].y = currentY;
        buttons[i].x = this.containerWidth / 2;
    }
  
    return buttons;
  }


  private createButtons(config: ListButtonConfig) {
    if (config.orientation === "vertical") {
        config.buttonConfigs = this.calculateVerticalSpacing(config.buttonConfigs, config.align);
    } else {
        config.buttonConfigs = this.calculateHorizontalSpacing(config.buttonConfigs, config.align);
    }

    config.buttonConfigs.forEach((btnConfig) => {
        let button: Phaser.GameObjects.Container;
        if (btnConfig.imageKey) {
            button = new ImageButton({ ...btnConfig, scene: config.scene });
        } else {
            button = new GraphicsButton({ ...btnConfig, scene: config.scene });
        }

        this.buttons.push(button);
        this.add(button);

        this.updateContainerSize();
    });
  }

  private updateContainerSize() {
        this.border = this.scene.add.rectangle(
            this.x, 
            this.y, 
            this.containerWidth,
            this.containerHeight,
            0x000000,
            0
        );
                
        this.border.setStrokeStyle(2, 0xff0000);
        this.border.setOrigin(0,0)
  
    this.sendToBack(this.border);
  }

}
