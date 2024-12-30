export default class FalseScene extends Phaser.Scene {
    constructor() {
        super('FalseScene');
    }

    preload() {

    }
    
    create() {
        const loadingText = this.add.text(this.scale.width / 2 , this.scale.height / 2 + 200, 'False', {
            fontSize: '15px Arial',
            color: 'black'
        }).setOrigin(0.5).setResolution(2);
    }
}