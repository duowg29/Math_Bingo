import { ButtonConfig } from "../components/buttons/BaseButton";
import { ListButton } from "../components/buttons/ListButton";
import { BaseProgressBarModel } from "../components/progressBars/models/BaseProgressBarModel";
import { LinearProgressBarModelView, Orientation } from "../components/progressBars/models/LinearProgressBarModelView";
import { LinearProgressBarView } from "../components/progressBars/views/LinearProgressBarView";


export default class TestScene extends Phaser.Scene {
  private progressBar: any;

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


      const progressBarModel = new BaseProgressBarModel(0, 100, 0);

      this.progressBar = new LinearProgressBarView(
          this,
          progressBarModel,
          new LinearProgressBarModelView(
          300,900,
          1200, 20,  
          '0x444444',
          '0x00ff00',  
          8,        
          5000,      
          0,        
          Orientation.VERTICAL 
          
          )
      );  

      this.progressBar.startProgress();



  }
}

      

    

   

    
  