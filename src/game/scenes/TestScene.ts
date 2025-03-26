import { ButtonConfig } from "../components/buttons/BaseButton";
import { BaseProgressBarModel } from "../components/progressBars/models/BaseProgressBarModel";
import { CircularProgressBarModelView } from "../components/progressBars/models/CircularProgressBarModelView";
import { LinearProgressBarModelView, Orientation } from "../components/progressBars/models/LinearProgressBarModelView";
import { CircularProgressBarView } from "../components/progressBars/views/CircularProgressBarView";
import { LinearProgressBarView } from "../components/progressBars/views/LinearProgressBarView";
import { colorMap } from "../components/key-value/Color"
import { Align } from "../components/enums/Align";
import { ListButton } from "../components/buttons/ListButton";

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
      x: 900,
      y: 150,
      buttonConfigs: buttonConfigs, 
      containerWidth: 1000,
      containerHeight: 200,
      orientation: Orientation.HORIZONTAL , 
      align: Align.AROUND 
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

    // this.progressBar.startProgress();
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


    // const loadingContainer = this.add.container(0, 0);
    // const loadingContainer2 = this.add.container(0, 0);
    
    const widthButton = 300;
    const heightButton = 50;
    const padding = 10;
    const scale = 20;
    const minAlpha = 0.5;
    const radius = 20;
    const duration = 300;
    
    const createButton = (x: number, y: number, backgroundColor: string, fillColor: string, isCorrect: boolean
    ) => {
      const container = this.add.container(x, y);
    
      const loadingBarBackground = this.add.graphics();
      loadingBarBackground.fillStyle(parseInt(backgroundColor), 1);
      loadingBarBackground.fillRoundedRect(
        -(widthButton + padding) / 2,
        -(heightButton + padding) / 2,
        widthButton + padding,
        heightButton + padding,
        radius
      );
    
      const loadingBarFill = this.add.graphics();
      loadingBarFill.fillStyle(parseInt(fillColor), 1);
      loadingBarFill.fillRoundedRect(
        -widthButton / 2,
        -heightButton / 2,
        widthButton,
        heightButton,
        radius - 5
      );
    
      container.add([loadingBarBackground, loadingBarFill])
        .setSize(widthButton + padding, heightButton + padding)
        .setInteractive();
    
      container.on("pointerdown", () => {
        if (isCorrect) {

        this.tweens.add({
          targets: loadingBarBackground,
          scaleX: (widthButton + padding + scale) / (widthButton + padding),
          scaleY: (heightButton + padding + scale) / (heightButton + padding),
          duration: duration,
          yoyo: true,
          ease: "Sine.easeInOut",
          onUpdate: (tween, target) => {
            const scaleFactor = (target.scaleX + target.scaleY) / 2;
            target.setAlpha(Math.max(minAlpha, 1 - (scaleFactor - 1) * 2));
          }
        });

        this.tweens.add({
          targets: loadingBarFill,
          duration: duration,
          yoyo: true,
          onComplete: () => {
            loadingBarFill.clear();
            loadingBarFill.fillStyle(parseInt(colorMap.green), 1);
            loadingBarFill.fillRoundedRect(
              -widthButton / 2,
              -heightButton / 2,
              widthButton,
              heightButton,
              radius - 5
            );
          }
        });

      }else{
          this.tweens.add({
            targets: container,
            x: x + 10,
            duration: 50,
            yoyo: true,
            repeat: 3,
            ease: "Sine.easeInOut",
          });
    
          this.tweens.add({
            targets: loadingBarFill,
            duration: duration,
            yoyo: true,
            onComplete: () => {
              loadingBarFill.clear();
              loadingBarFill.fillStyle(parseInt(colorMap.red), 1);
              loadingBarFill.fillRoundedRect(
                -widthButton / 2,
                -heightButton / 2,
                widthButton,
                heightButton,
                radius - 5
              );
            }
          });
      }
      });
      return container;
    };
    
    const button1 = createButton(0, 0, colorMap.grayLight, colorMap.blue, true);
    
    const button2 = createButton(700, 0, colorMap.grayLight, colorMap.blue, false);
    
    const mainContainer = this.add.container(550, 350);

    mainContainer.add([button1, button2]);
}
}
