import { ButtonConfig } from "../buttons/BaseButton";
import { ListButton } from "../buttons/ListButton";
import { colorMap } from "../key-value/Color";
import  BasePopup from "./BasePopup";

export default class ConfirmDialog extends BasePopup {
    constructor() {
        super("ConfirmDialog");
    }
    preload(){
        this.load.image('button', 'assets/images/MCT_button.png');
        this.load.image('button_cancel', 'assets/images/MCT_button_cancel.png');
        // this.load.image('button_cancel', 'assets/images/MCT_icon_cancel.png');

    }

    create() {
        const width = 480;
        const height = 400;

        this.createPopup(width, height, "Thoát" ,"Bạn có muốn thoát game không?")
        const buttonConfigs: ButtonConfig[] = [
            {
            scene: this,
            x: 0,
            y: 0,
            width: 150,
            height: 50,
            text: "Click Me",
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
            x: 0, y: 0,            
            width: 110,
            height: 140,
            imageKey: "button",
            textColor: "0xFF0000",
            text: "Settings",
            onClick: () => {
                const isCorrect = Math.random() > 0.5;
                console.log(isCorrect);
    
                // Phát âm thanh
                this.sound.play(isCorrect ? 'success' : 'failure');
    
                return isCorrect;
            },
            },
            { 
            scene: this, 
            x: 0, y: 0,             
            width: 110,
            height: 140,
            imageKey: "button",
            textColor: "brownDark", 
            text: "Exit",
            onClick: () => {
                const isCorrect = Math.random() > 0.5;
                console.log(isCorrect);
    
                this.sound.play(isCorrect ? 'success' : 'failure');
    
                return isCorrect;
            }, 
            },
            { 
            scene: this, 
            x: 0, y: 0,             
            width: 110,
            height: 140,
            imageKey: "button",
            textColor: "0xFF0000", 
            text: "Download",
            onClick: () => {
                const isCorrect = Math.random() > 0.5;
                console.log(isCorrect);
    
                this.sound.play(isCorrect ? 'success' : 'failure');
    
                return isCorrect;
            }, 
            },
        ];
    
        const listButton = new ListButton({
            scene: this,
            x: -225,
            y: 0,
            buttonConfigs: buttonConfigs, 
            orientation: "horizontal", 
            align: "around" 
        }).setScale(0.45);

        this.popupContainer.add(listButton)
    }
}
