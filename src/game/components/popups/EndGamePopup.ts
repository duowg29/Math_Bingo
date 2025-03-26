import BasePopup from "./BasePopup";

export default class EndGamePopup extends BasePopup {
    private finalScore: number;

    constructor() {
        super("EndGamePopup");
        this.finalScore || 0; 
    }

    preload(){
        this.load.image('button_cancel', 'assets/images/MCT_button_cancel.png');

    }

    create() {
        const width = 500;
        const height = 400;

        this.createPopup(width, height, "Game Over", "Điểm số")
 
        // const scoreText = this.add.text(0, -50, `Điểm số: ${this.finalScore}`, {
        //     fontSize: "30px",
        //     fontStyle: "bold",
        //     color: "#000000"
        // }).setOrigin(0.5);

        const restartButton = this.createButton(0, 50, "Chơi lại", 0x007BFF, () => this.restartGame());

        const exitButton = this.createButton(0, 120, "Thoát", 0xFF0000, () => this.exitGame());

        this.popupContainer.add([ restartButton, exitButton]);

    }

    createButton(x: number, y: number, text: string, color: number, callback: () => void) {
        const button = this.add.text(x, y, text, {
            fontSize: "25px",
            color: "#FFFFFF",
            backgroundColor: `#${color.toString(16).padStart(6, "0")}`,
            padding: { top: 10, bottom: 10, left: 20, right: 20 }
        }).setInteractive().setOrigin(0.5);

        button.on("pointerup", callback);
        return button;
    }

    restartGame() {
        console.log("Restart Game");
        this.scene.start("GameScene"); 
    }

    exitGame() {
        console.log("Exit Game");
        this.scene.stop();
    }
}
