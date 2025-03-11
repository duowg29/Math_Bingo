

import BasePopup from "./BasePopup";

export default class SettingPopup extends BasePopup {
    private progressValue: number = 50;
    private progressBarWidth: number = 300;
    private progressBarHeight: number = 20;
    private progressContainer: any;
    private progressBarGraphics: any;

    constructor() {
        super("SettingPopup");
    }

    create() {
        const width = 500;
        const height = 400;

        this.createPopup(width, height, "Cài đặt", "Cài đặt âm thanh", {
            "Tắt": () => this.off(),
            "Bật": () => this.on()
        });

        this.createProgressBar();





 

    }

    createProgressBar() {

        this.progressContainer = this.add.container(0, 0);
        this.popupContainer.add(this.progressContainer);
    
        this.progressBarGraphics = this.add.graphics();
        this.progressContainer.add(this.progressBarGraphics);
        this.drawProgressBar();
    
        const decreaseButton = this.add.text(-this.progressBarWidth / 2 - 40, 0, "-", {
            fontSize: "30px",
            color: "#ffffff",
            backgroundColor: "#ff0000",
            padding: { top: 5, bottom: 5, left: 15, right: 15 }
        }).setInteractive().setOrigin(0.5);
    
        decreaseButton.on("pointerup", () => this.updateProgress(-10));
    
        const increaseButton = this.add.text(this.progressBarWidth / 2 + 40, 0, "+", {
            fontSize: "30px",
            color: "#ffffff",
            backgroundColor: "#00ff00",
            padding: { top: 5, bottom: 5, left: 10, right: 10 }
        }).setInteractive().setOrigin(0.5);
    
        increaseButton.on("pointerup", () => this.updateProgress(10));
    
        this.progressContainer.add([decreaseButton, increaseButton]);
    
        this.progressContainer.setPosition(0, 50);
    }
    
    drawProgressBar() {
        this.progressBarGraphics.clear();
    
        this.progressBarGraphics.fillStyle(0x000000, 1);
        this.progressBarGraphics.fillRect(-this.progressBarWidth / 2, -10, this.progressBarWidth, this.progressBarHeight);
    
        this.progressBarGraphics.fillStyle(0x00ff00, 1);
        this.progressBarGraphics.fillRect(-this.progressBarWidth / 2, -10, (this.progressValue / 100) * this.progressBarWidth, this.progressBarHeight);
    }
    
    updateProgress(amount: number) {
        this.progressValue = Phaser.Math.Clamp(this.progressValue + amount, 0, 100);
        this.drawProgressBar();
    }
    

    off() {
        console.log("Tắt âm thanh");
    }
    on(){
        console.log("bật âm thanh")
    }
}
