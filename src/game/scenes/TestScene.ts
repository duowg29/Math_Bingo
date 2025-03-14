import { ButtonConfig } from "../components/buttons/BaseButton";
import { GraphicsButton } from "../components/buttons/GraphicsButton";
import { ImageButton } from "../components/buttons/ImageButton";
import { ListButton } from "../components/buttons/ListButton";


export default class TestScene extends Phaser.Scene {

    constructor() {
        super('TestScene');
    }

    preload(){
      this.load.image('button', 'assets/images/MCT_button.png');
    }

    create(){

      const buttonConfigs: ButtonConfig[] = [
        {
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
          },
          },
        { 
          scene: this, 
          x: 0, y: 0,            
          width: 110,
          height: 140,
          imageKey: "button",
          textColor:"0xFF0000",
          text: "Settings",
          onClick: () => {
            const isCorrect = Math.random() > 0.5; 
            console.log(isCorrect)
            return isCorrect; 
          },
        },
        { 
          scene: this, 
          x: 0, y: 0,             
          width: 110,
          height: 140,
          imageKey: "button",
          textColor:"0xFF0000", 
          text: "Exit",
          onClick: () => {
            const isCorrect = Math.random() > 0.5; 
            console.log(isCorrect)
            return isCorrect; 
          }, 
        },
        { 
          scene: this, 
          x: 0, y: 0,             
          width: 110,
          height: 140,
          imageKey: "button",
          textColor:"0xFF0000", 
          text: "Download",
          onClick: () => {
            const isCorrect = Math.random() > 0.5; 
            console.log(isCorrect)
            return isCorrect; 
          }, 
        },
      ];
  
      const listButton = new ListButton({
        scene: this,
        x: 300,
        y: 100,
        buttonConfigs: buttonConfigs, 
        orientation: "horizontal", 
        align: "around" 
      });

    // const progressData = new ProgressBarModel(1, 300, 400, 1000, 15,"0x006400", 3000);
    // this.lineProgressView = new LinearProgressBarView(this, progressData);
    // this.lineProgressView.startProgress();

    // const progressBarData = new ProgressBarModel(1, 300, 700, 40, 200, "0x006400", 3000);
    // const circularProgress = new CircularProgressBarView(this, progressBarData);
    // circularProgress.setScale(2)
    // this.add.existing(circularProgress);
    // circularProgress.startProgress();

  }


}

      

    

   

    
  