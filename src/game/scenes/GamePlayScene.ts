import { ButtonConfig } from "../components/buttons/BaseButton";
import { ListButton } from "../components/buttons/ListButton";
import { colorMap } from "../components/key-value/Color";
import { Orientation } from "../components/enums/Orientation";
import BaseGamePlayScene from "./BaseGamePlayScene";
import { Align } from "../components/enums/Align";

export default class GamePlayScene extends BaseGamePlayScene {
    private containerWidth: number = 1920;
    private containerHeight: number = 1200;
    private scaleFactor: number; 

    constructor() {
        super("GamePlayScene");
    }

    preload(): void {
        this.load.audio('success', 'assets/audio/sound_success.mp3');
        this.load.audio('failure', 'assets/audio/sound_failure.mp3');
    }

    create() {
        super.create(); 

        this.scaleFactor = Math.min(this.scale.width / this.containerWidth, this.scale.height / this.containerHeight);

        const buttonConfigs: ButtonConfig[] = [
            {
            scene: this,
            x: 0,
            y: 0,
            width: 150,
            height: 50,
            text: "PLAY",
            fontSize: 24,
            backgroundColor: colorMap.orange,
            shape: "rectangle",
            borderRadius: 10,
            onClick: () => {
                const isCorrect = Math.random() > 0.5;
                console.log(isCorrect);
                
                // Phát âm thanh
                if (isCorrect) {
                this.sound.play('success');
                } else {
                this.sound.play('failure');
                }
    
                return isCorrect;
            },
            },
            { 
            scene: this,
            x: 0,
            y: 0,
            width: 150,
            height: 50,
            text: "OPTIONS",
            fontSize: 24,
            backgroundColor: colorMap.orange,
            shape: "rectangle",
            borderRadius: 10,
            onClick: () => {
                const isCorrect = Math.random() > 0.5;
                console.log(isCorrect);
                
                // Phát âm thanh
                if (isCorrect) {
                this.sound.play('success');
                } else {
                this.sound.play('failure');
                }
    
                return isCorrect;
            },
            },
            { 
            scene: this,
            x: 0,
            y: 0,
            width: 150,
            height: 50,
            text: "CREDITS",
            fontSize: 24,
            backgroundColor: colorMap.orange,
            shape: "rectangle",
            borderRadius: 10,
            onClick: () => {
                const isCorrect = Math.random() > 0.5;
                console.log(isCorrect);
                // Phát âm thanh
                if (isCorrect) {
                this.sound.play('success');
                } else {
                this.sound.play('failure');
                }
    
                return isCorrect;
            },
            },
        ];
    
        const listButton = new ListButton({
            scene: this,
            x: this.cameras.main.centerX,
            y: this.scale.height / 2,
            containerWidth: 300, 
            containerHeight: 250,
            buttonConfigs: buttonConfigs, 
            orientation: Orientation.VERTICAL, 
            align: Align.AROUND

        });

        listButton.setScale(this.scaleFactor * 1.5)
    }
}
