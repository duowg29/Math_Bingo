import { colorMap } from "../components/key-value/Color";

export default class LoadingSceneV2 extends Phaser.Scene {
    private radius: number = 15;
    private offset: number = 80;
    private line: Phaser.GameObjects.Graphics;
    private circles: Phaser.GameObjects.Container[] = [];
    private lines: Phaser.GameObjects.Graphics[] = [];
    private centerX: number = 950;
    private centerY: number = 600;
    private duration: number = 2000;
    public exitButton!: Phaser.GameObjects.Image;


    constructor() {
        super("LoadingSceneV3");
    }



    create() {
        
        this.line = this.add.graphics({ lineStyle: { width: 4, color: parseInt(colorMap.red) } });

        const positions = [
            { x: 0, y: -this.offset * 2 },  // 1 (Đỉnh trên)
            { x: -this.offset, y: -this.offset }, // 2
            { x: this.offset, y: -this.offset },  // 3
            { x: -this.offset * 2, y: 0 },   // 4 (Cạnh trái)
            { x: 0, y: 0 },             // 5 (Chấm trung tâm)
            { x: this.offset * 2, y: 0 },    // 6 (Cạnh phải)
            { x: -this.offset, y: this.offset },  // 7
            { x: this.offset, y: this.offset },   // 8
            { x: 0, y: this.offset * 2 }     // 9 (Đỉnh dưới)
        ];

        positions.forEach((pos) => {
            const circle = this.add.graphics();
            circle.fillStyle(parseInt(colorMap.orange), 1);
            circle.fillCircle(0, 0, this.radius);

            const container = this.add.container(this.centerX + pos.x, this.centerY + pos.y);
            container.add(circle);
            container.setScale(1);

            this.circles.push(container);
        });
    }

   
    
}