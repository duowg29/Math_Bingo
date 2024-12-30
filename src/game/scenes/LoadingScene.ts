export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
        this.load.spritesheet('loading', 'assets/images/loader_spritesheet_1.png', {
            frameWidth: 64,  
            frameHeight: 64,
            endFrame: 9
        });

        this.load.image('logo','assets/images/logo.png');
    }

    create() {
        const offsetTitle = -70;
        const offsetLoading = 60;
        const fontSizeTitle = '30px Arial';
        const fontSizeLoading = '15px Arial';

        this.add.text(this.scale.width / 2, this.scale.height / 2 + offsetTitle, 'Addition Scale', {
            fontSize: fontSizeTitle,
            fontStyle: "bold",
            color: 'black'
        }).setOrigin(0.5).setResolution(2);

        this.add.text(this.scale.width / 2, this.scale.height / 2 + offsetLoading, 'LOADING', {
            fontSize: fontSizeLoading,
            color: 'black'
        }).setOrigin(0.5).setResolution(2);

        this.anims.create({
            key: 'falling',     
            frames: this.anims.generateFrameNumbers('loading', { start: 0, end: 9 }),
            frameRate: 10,        
            repeat: -1         
        });

        const loading = this.add.sprite(this.scale.width / 2, this.scale.height / 2, 'loading');
        loading.play('falling');

        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.launch('GamePlayScene');
        });

        // this.cameras.main.fadeOut(1000); 
    }

    update() {

    }
}
