import BasePopup from "./BasePopup";

export default class NotificationPopup extends BasePopup {
    private finalScore: number = 0;

    constructor() {
        super("NotificationPopup");
    }

    create() {
        const popupWidth = 500;
        const popupHeight = 400;

        const titleText = "Game Over";
        const message = `Your final score is: ${this.finalScore}`;

        const buttonsConfig = {
            "OK": () => this.closePopup(),
            "Exit": () =>this.exit()
        };

        this.createPopup(popupWidth, popupHeight, titleText, message, buttonsConfig);
    }
    
    exit(){
        console.log("thoát game")
    }
}
