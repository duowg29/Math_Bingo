export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
   
        this.load.image('logo','assets/images/MCT_logo.png');
        this.load.image('title','assets/images/MCT_title.png');
        this.load.image('text_loading','assets/images/MCT_text_loading.png');
        this.load.image('effect','assets/images/MCT_effect.png');
        this.load.image('expression','assets/images/MCT_expression.png');
    }

    create() {

        this.add.image(0,0,'logo').setOrigin(0.5,0.5).setDisplaySize(95,75);

        this.add.text(this.scale.width / 2 , this.scale.height / 2 - 80, 'EM HỌC TOÁN', {
            fontSize: '30px Arial',
            fontStyle: "bold",
            color: 'black'
        }).setOrigin(0.5).setResolution(2);
    

        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.launch('GamePlayScene');
        });
        // this.cameras.main.fadeOut(1000); 

        
    }

    update() {

    }
}
