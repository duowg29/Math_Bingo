import { colorMap } from "../key-value/Color";


export default class BasePopup extends Phaser.Scene {
    public popupContainer!: Phaser.GameObjects.Container;
    public headerContainer!: Phaser.GameObjects.Container;
    public headerBackground : Phaser.GameObjects.Graphics;
    public background!: Phaser.GameObjects.Rectangle;
    public exitButton!: Phaser.GameObjects.Image;
    public isFullScreen: boolean = false;
    public popup: Phaser.GameObjects.Graphics;
    public content: Phaser.GameObjects.Text;
    public title: Phaser.GameObjects.Text;
    public brHeader: number = 15;
    public brContainer: number = 20;


    constructor(sceneKey: string) {
        super(sceneKey);
    }

    public createPopup(popupWidth: number, popupHeight: number, titleText: string, message: string) {
        this.background = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.5
        ).setInteractive();      

        
        this.popupContainer = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);
        this.popup = this.add.graphics();
        this.popup.fillStyle(0xFFFFFF, 1);
        this.popup.fillRoundedRect(-popupWidth / 2, -popupHeight / 2, popupWidth, popupHeight, this.brContainer);

        this.headerContainer = this.add.container(0, -popupHeight / 2 + 30);
        
        this.headerBackground = this.add.graphics();
        this.headerBackground.fillStyle(parseInt(colorMap.orange), 1);
        this.headerBackground.fillRoundedRect(-popupWidth / 2, -30, popupWidth, 60, this.brHeader);

        this.title = this.add.text(0, 0, titleText, {
            fontSize: "35px",
            color: "#FFFFFF",
            fontStyle: "bold"
        }).setOrigin(0.5).setResolution(2);

        this.exitButton = this.add.image(popupWidth / 2 - 30, 0, "button_cancel"
        ).setOrigin(0.5).setInteractive().setDisplaySize(40,40);
        this.exitButton.on("pointerup", () => this.closePopup());

        this.headerContainer.add([this.headerBackground, this.title, this.exitButton]);
        
        this.content = this.add.text(0, -popupHeight / 2 + 120, message, {
            fontSize: "20px",
            color: "#000000",
            align: "center",
            fontStyle: "bold",
            wordWrap: { width: popupWidth - 40 }
        }).setOrigin(0.5).setResolution(2);
            
        this.popupContainer.add([this.popup, this.headerContainer, this.content]);
    }

    closePopup() {
        this.scene.stop();
    }

    toggleFullScreen() {
        this.isFullScreen = !this.isFullScreen;
        if (this.isFullScreen) {
            this.popupContainer.setScale(1.5);
        } else {
            this.popupContainer.setScale(1);
        }
    }

}
