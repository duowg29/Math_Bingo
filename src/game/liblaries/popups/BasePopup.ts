export default class BasePopup extends Phaser.Scene {
    public popupContainer!: Phaser.GameObjects.Container;
    private headerContainer!: Phaser.GameObjects.Container;
    private background!: Phaser.GameObjects.Rectangle;
    private exitButton!: Phaser.GameObjects.Text;
    private buttons: Phaser.GameObjects.Text[] = [];
    private isFullScreen: boolean = false;

    constructor(sceneKey: string) {
        super(sceneKey);
    }

    createPopup(popupWidth: number, popupHeight: number, titleText: string, message: string, buttonsConfig: { [key: string]: () => void }) {
        this.background = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.5
        ).setInteractive();      

        
        this.popupContainer = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);

        const popup = this.add.graphics();
        popup.fillStyle(0xFFFFFF, 1);
        popup.fillRoundedRect(-popupWidth / 2, -popupHeight / 2, popupWidth, popupHeight, 40);

        this.headerContainer = this.add.container(0, -popupHeight / 2 + 30);
        
        const headerBackground = this.add.graphics();
        headerBackground.fillStyle(0x007BFF, 1);
        headerBackground.fillRoundedRect(-popupWidth / 2, -30, popupWidth, 60, 20);

        const title = this.add.text(0, 0, titleText, {
            fontSize: "30px",
            color: "#FFFFFF",
            fontStyle: "bold"
        }).setOrigin(0.5).setResolution(2);

        this.exitButton = this.add.text(popupWidth / 2 - 30, 0, "X", {
            fontSize: "30px",
            color: "red",
            fontStyle: "bold"
        }).setOrigin(0.5).setInteractive();

        this.exitButton.on("pointerup", () => this.closePopup());


        this.headerContainer.add([headerBackground, title, this.exitButton]);
        const content = this.add.text(0, -popupHeight / 2 + 150, message, {
            fontSize: "25px",
            color: "#000000",
            align: "center",
            fontStyle: "bold",
            wordWrap: { width: popupWidth - 40 }
        }).setOrigin(0.5).setResolution(2);
        this.createButtons(buttonsConfig, popupWidth, popupHeight);
        this.popupContainer.add([popup, this.headerContainer, content, ...this.buttons]);

    }

    createButtons(buttonsConfig: { [key: string]: () => void }, popupWidth: number, popupHeight: number) {
        this.buttons = [];
        const buttonKeys = Object.keys(buttonsConfig);
        const buttonCount = buttonKeys.length;
        const buttonWidth = Math.min(120, popupWidth / buttonCount - 20);
        const buttonY = popupHeight / 2 - 60;

        buttonKeys.forEach((key, index) => {
            const buttonX = this.getButtonX(index, buttonCount, popupWidth, buttonWidth);
            const button = this.add.text(buttonX, buttonY, key, {
                fontSize: "20px",
                color: "#ffffff",
                backgroundColor: "#008000",
                align: "center",
                fixedWidth: buttonWidth,
                padding: { top: 15, bottom: 15 }
            }).setOrigin(0.5).setResolution(2).setInteractive();

            button.on("pointerup", buttonsConfig[key]); 
            this.buttons.push(button);
        });
    }

    getButtonX(index: number, buttonCount: number, popupWidth: number, buttonWidth: number): number {
        if (buttonCount === 1) return 0; 
        const totalWidth = buttonCount * buttonWidth + (buttonCount - 1) * 20; 
        const startX = -totalWidth / 2 + buttonWidth / 2;
        return startX + index * (buttonWidth + 20);
    }

    closePopup() {
        console.log("Popup Closed");
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
