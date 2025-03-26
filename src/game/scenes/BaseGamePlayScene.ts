export default class BaseGamePlayScene extends Phaser.Scene {
    private titleText!: Phaser.GameObjects.Text;

    constructor(sceneKey: string) {
        super(sceneKey);
    }

    preload() {
        this.load.image("background", "assets/background.png");
    }

    create() {
        const { width, height } = this.scale;

        const bg = this.add.image(width / 2, height / 2, "background");
        bg.setDisplaySize(width, height);

        this.titleText = this.add.text(width / 2, height / 4, "Welcome to Game", {
            fontFamily: "Arial",
            fontSize: `${Math.min(width, height) * 0.05}px`, 
            color: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5).setResolution(2);

    }
}
