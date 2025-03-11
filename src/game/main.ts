

import { AUTO, Game } from "phaser";
import Boot from "./scenes/Boot";
import LoadingScene from "./scenes/LoadingScene";
import MainGame from './scenes/Game';
import ConfirmDialog from "./liblaries/popups/ConfirmDialog";
import SettingPopup from "./liblaries/popups/SettingPopup";
import EndGamePopup from "./liblaries/popups/EndGamePopup";
import NotificationPopup from "./liblaries/popups/NotificationPopup";
import BaseTime from "./liblaries/times/BaseTime";
import TestScene from "./scenes/TestScene";




//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1920,
    height: 1200,
    parent: 'phaser-example',
    backgroundColor: '#FFFFFF',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        max: {
            width: 1920, 
            height: 1080, 
        },
        min: {
            width: 480, 
            height: 270,
        }
    },

    pixelArt: false, 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
            debugShowVelocity: false
        }
    },
    scene: [
        Boot,
        MainGame,
        LoadingScene,
        ConfirmDialog,
        SettingPopup,
        EndGamePopup,
        NotificationPopup,
        BaseTime,
        TestScene
       
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;

