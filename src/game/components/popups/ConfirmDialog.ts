import BasePopup from "./BasePopup";

export default class ConfirmDialog extends BasePopup {
    constructor() {
        super("ConfirmDialog");
    }

    create() {
        const width = 500;
        const height = 400;

        this.createPopup(width, height, "Thoát" ,"Bạn có muốn thoát game không?", {
            "Có": () => this.confirm(),
            "Không": () => this.cancel(),
            "Toàn màn hình": () => this.toggleFullScreen(),
            "xem": () => this.view(),
    
        });
    }

    confirm() {
        console.log("User chọn CÓ");
        // this.closePopup();
    }

    cancel() {
        console.log("User chọn KHÔNG");
        // this.closePopup();
    }
    view(){
        console.log("User chọn XEM");
        // this.closePopup();  
    }
}
