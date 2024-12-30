


//  Find out more information about the Game Config at:

import { AUTO, Game } from "phaser";
import Boot from "./scenes/Boot";
import GameOver from "./scenes/GameOver";
import MainMenu from "./scenes/MainMenu";
import Preloader from "./scenes/Preloader";
import LoadingScene from "./scenes/LoadingScene";

//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 700,
    height: 600,
    parent: 'phaser-example',
    backgroundColor: '#FFFFFF',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        max: {
            width: 700, 
            height: 600, 
        },
        min: {
            width: 320, 
            height: 240,
        }
    },

    pixelArt: false, 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true,
            debugShowVelocity: false
        }
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        GameOver,
        LoadingScene,  
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
