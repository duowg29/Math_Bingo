import { BaseButton } from "../liblaries/buttons/BaseButton";
import { GraphicsButton } from "../liblaries/buttons/GraphicsButton";
import { ImageButton } from "../liblaries/buttons/ImageButton";
import { ListButton } from "../liblaries/buttons/ListButton";
import { BaseProgressBar } from "../liblaries/progress_bar/BaseProgressBar";

export default class TestScene extends Phaser.Scene {
  private buttonContainer!: Phaser.GameObjects.Container;
  private border!: Phaser.GameObjects.Rectangle;
  private buttons: Phaser.GameObjects.Container[] = [];
    constructor() {
        super('TestScene');
    }

    preload(){
      this.load.image('button', 'assets/images/MCT_button.png');
    }

    create(){

      const myButton = new GraphicsButton({
        scene: this,
        x: 600,
        y: 500,
        width: 150,
        height: 50,
        text: "Click Me",
        fontSize: 24,
        // Nếu không set color mặc định là white
        // textColor: "#00FF00",
        backgroundColor: "#ff0000",
        shape: "rectangle",
        borderRadius: 10,
        onClick: () => {
          const isCorrect = Math.random() > 0.5; 
          console.log(isCorrect)
          return isCorrect; 
        }
      });

      const imageButton = new ImageButton({
        scene: this,
        x: 250,
        y: 500,
        width: 110,
        height: 140,
        imageKey: 'button',
        text: 'Click Me',
        borderRadius: 10, 
        fontSize: 20,
        textColor: '#0x00000',
        onClick: () => console.log("Image Button Clicked!"),
      });
    

    }
   

}