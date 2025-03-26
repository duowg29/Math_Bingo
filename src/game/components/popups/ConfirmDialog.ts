import { ButtonConfig } from "../buttons/BaseButton";
import {ListButton } from "../buttons/ListButton";
import { colorMap } from "../key-value/Color";
import { Orientation } from "../enums/Orientation";
import  BasePopup from "./BasePopup";

export default class ConfirmDialog extends BasePopup {
    constructor() {
        super("ConfirmDialog");
    }
    preload(){
        this.load.image('button', 'assets/images/MCT_button.png');
        this.load.image('button_cancel', 'assets/images/MCT_button_cancel.png');
        // this.load.image('button_cancel', 'assets/images/MCT_icon_cancel.png');

    }

    create() {
        const width = 480;
        const height = 400;

        this.createPopup(width, height, "Thoát" ,"Bạn có muốn thoát game không?")
    }
}
