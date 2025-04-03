import { AUTO, Game } from "phaser";
import Boot from "./scenes/Boot";
import LoadingScene from "./scenes/LoadingScene";
import MainGame from "./scenes/Game";
import ConfirmDialog from "./components/popups/ConfirmDialog";
import SettingPopup from "./components/popups/SettingPopup";
import EndGamePopup from "./components/popups/EndGamePopup";
import NotificationPopup from "./components/popups/NotificationPopup";
import TestScene from "./scenes/TestScene";
import LoadingSceneV2 from "./scenes/LoadingSceneV2";
import LoadingSceneV3 from "./scenes/LoadingSceneV3";
import { GamePlayScene1 } from "./scenes/TestTableScene";
import GamePlayScene from "./scenes/GamePlayScene";
import SelectDifficulty from "./scenes/SelectDifficulty";
import EndScene from "./scenes/EndScene";
import LostScene from "./scenes/LostScene";

//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 900,
    // width: 700,
    // height: 600,
    parent: "phaser-example",
    backgroundColor: "#FFFFFF",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        max: {
            width: 1920,
            height: 1080,
            // width: 700,
            // height: 600,
        },
        min: {
            width: 480,
            height: 270,
        },
    },

    pixelArt: false,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 },
            debug: true,
            debugShowVelocity: true,
        },
    },
    scene: [SelectDifficulty, GamePlayScene, EndScene, LostScene],
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;
