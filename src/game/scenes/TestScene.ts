import { ButtonConfig } from "../components/buttons/BaseButton";
import { ListButton } from "../components/buttons/ListButton";
import { BaseProgressBarModel } from "../components/progressBars/models/BaseProgressBarModel";
import { CircularProgressBarModelView } from "../components/progressBars/models/CircularProgressBarModelView";
import { LinearProgressBarModelView, Orientation } from "../components/progressBars/models/LinearProgressBarModelView";
import { CircularProgressBarView } from "../components/progressBars/views/CircularProgressBarView";
import { LinearProgressBarView } from "../components/progressBars/views/LinearProgressBarView";
import { colorMap } from "../components/key-value/Color"


export default class TestScene extends Phaser.Scene {
  private progressBar: any;

  constructor() {
    super('TestScene');
  }

  preload() {
    this.load.image('button', 'assets/images/MCT_button.png');

    this.load.audio('success', 'assets/audio/sound_success.mp3');
    this.load.audio('failure', 'assets/audio/sound_failure.mp3');
  }

  create() {
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
      x: 400,
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
        400, 900,
        1000, 20,  
        colorMap.grayLight,        
        colorMap.orange,
        8,        
        5000,      
        0,        
        Orientation.HORIZONTAL 
      )
    );  

    this.progressBar.startProgress();
    this.progressBar.createThumb();


    const progressBarModel1 = new BaseProgressBarModel(0, 100, 0);

    const circularProgressBar = new CircularProgressBarView(
      this,
      progressBarModel, 
      new CircularProgressBarModelView(
        400,              
        500,              
        colorMap.grayLight, 
        colorMap.orange,       
        10,                
        3000,             
        0,                
        80                
      )
    );
    
  }


}
