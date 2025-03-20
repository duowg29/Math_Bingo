import { colorMap } from "../components/key-value/Color";

export default class LoadingSceneV2 extends Phaser.Scene {
    private radius: number = 15;
    private offset: number = 80;
    private line: Phaser.GameObjects.Graphics;
    private circles: Phaser.GameObjects.Container[] = [];
    private lines: Phaser.GameObjects.Graphics[] = [];
    private centerX: number = 950;
    private centerY: number = 600;
    private duration: number = 500;
    public exitButton!: Phaser.GameObjects.Image;


    constructor() {
        super("LoadingSceneV2");
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

        this.animateSymbols();
    }

    private drawSymbol(operation: string) {
        this.lines.forEach(line => line.destroy());
        this.lines = []; 
    
        const connections: number[][] = [];
    
        if (operation === "+") {
            connections.push([0, 8]); 
            connections.push([3, 5]); 
        } else if (operation === "-") {
            connections.push([3, 5]); 
        } else if (operation === "*") {
            connections.push([1, 7]); 
            connections.push([2, 6]); 
        } else if (operation === "/") {
            connections.push([3, 5]);
        }
    
        // let delay = 0;
        // connections.forEach(([start, end]) => {
        //     this.animateLine(start, end, delay);
        //     delay += 300;
        // });
    }
    
    private animateLine(startIdx: number, endIdx: number, delay: number) {
        const startPoint = this.circles[startIdx];
        const endPoint = this.circles[endIdx];
    
        const line = this.add.graphics();
        line.lineStyle(4, parseInt(colorMap.red));
        this.lines.push(line); 
    
        const tempLine = new Phaser.Geom.Line(startPoint.x, startPoint.y, startPoint.x, startPoint.y);
    
        this.tweens.add({
            targets: tempLine,
            x2: endPoint.x,
            y2: endPoint.y,
            duration: this.duration,
            ease: "Sine.easeInOut",
            // delay: delay,
            onUpdate: () => {
                line.clear();
                line.lineStyle(4, parseInt(colorMap.orange));
                line.strokeLineShape(tempLine);
            }
        });
    }
    
    
    private animateSymbols() {
        const operations = [
            { symbol: "+", indices: [0, 3, 4, 5, 8], lines: [[0, 8], [3, 5]] },
            { symbol: "-", indices: [3, 4, 5], lines: [[3, 5]] },
            { symbol: "*", indices: [1, 2, 4, 6, 7], lines: [[1, 7], [2, 6]] },
            { symbol: "/", indices: [0, 3, 4, 5, 8], lines: [[3, 5]] },
        ];
    
        let index = 0;
    
        const animateNext = () => {
            if (index >= operations.length) {
                index = 0; 
                this.time.delayedCall(0, animateNext);
                return;
            }
    
            const { symbol, indices, lines } = operations[index++];
        
            this.drawSymbol(symbol);
            // this.animateDot(indices);
        
            lines.forEach(([start, end], i) => {
                this.animateLine(start, end, i * 200);
            });
    
            this.tweens.add({
                targets: indices.map(i => this.circles[i]),
                scaleX: 2,
                scaleY: 2,
                duration: this.duration,
                ease: "Sine.easeInOut",
                yoyo: true,
                onComplete: animateNext,
            });
        };
    
        animateNext();
    }
    

    private animateDot(indicesToShow: number[]) {
        this.circles.forEach((circle, index) => {
            if (!indicesToShow.includes(index)) {
                this.tweens.add({
                    targets: circle,
                    alpha: 0, 
                    yoyo: true,
                    duration: this.duration
                });
            } else {
                circle.setAlpha(1);
            }
        });
    }
    
}