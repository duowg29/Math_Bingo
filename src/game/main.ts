


//  Find out more information about the Game Config at:

import { AUTO, Game } from "phaser";
import Boot from "./scenes/Boot";
import LoadingScene from "./scenes/LoadingScene";
import MainMenu from './scenes/MainMenu';


//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 1920,
    height: 1080,
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
            debug: true,
            debugShowVelocity: false
        }
    },
    scene: [
        Boot,
<<<<<<< HEAD
        MainMenu,
=======
>>>>>>> 4a3e05da39b40b6eaac45a0e0576d431c2347fa4
        LoadingScene,  
    ]
};

const StartGame = (parent: string) => {

    return new Game({ ...config, parent });

}

export default StartGame;
