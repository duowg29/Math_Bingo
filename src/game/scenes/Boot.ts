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
        // this.scene.start('LoadingScene')
        // this.scene.start('SettingPopup')
        // this.scene.start('SettingPopup')
        // this.scene.start('BaseProgressBar')
        // this.scene.start('BaseTime')
        this.scene.start('TestScene')

    }
}
