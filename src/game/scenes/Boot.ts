import { Scene } from 'phaser';

export default class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        this.load.pack('pack', 'assets/boot-asset-pack.json');
    }

    create ()
    {        
        // this.scene.start('GamePlayScene')
        // this.scene.start('LoadingScene')
        // this.scene.start('SettingPopup')
        // this.scene.start('SettingPopup')
        // this.scene.start('BaseProgressBar')
        // this.scene.start('BaseTime')
        this.scene.start('TestScene')
        // this.scene.launch('ConfirmDialog')
        // this.scene.launch('LoadingSceneV2')
        // this.scene.launch('LoadingSceneV3')
        // this.scene.launch('EndGamePopup')
        // this.scene.start('GamePlayScene')

    }
}
