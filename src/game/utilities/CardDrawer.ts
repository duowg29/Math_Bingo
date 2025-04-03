import Phaser from "phaser";
import { CardDTO } from "../dto/CardDTO";
import GamePlayScene from "../scenes/GamePlayScene";

export default class CardDrawer {
    private scene: GamePlayScene;
    private cardData: CardDTO[];
    private bingo: { cols: number; rows: number };

    constructor(
        scene: GamePlayScene,
        bingo: { cols: number; rows: number },
        cardData: CardDTO[]
    ) {
        this.scene = scene;
        this.bingo = bingo;
        this.cardData = cardData;
    }

    drawCards(): void {
        const { cols, rows } = this.bingo;

        this.cardData.sort((a, b) => {
            const numA = parseInt(a.key.replace("card", ""));
            const numB = parseInt(b.key.replace("card", ""));
            return numA - numB;
        });

        let cardIndex = 0;

        const cardWidth = this.cardData[0].width;
        const cardHeight = this.cardData[0].height;
        const startX =
            this.scene.cameras.main.centerX - (cols * cardWidth) / 2 + 50;
        const startY =
            this.scene.cameras.main.centerY - (rows * cardHeight) / 2 + 100;

        for (let row = 0; row < rows; row++) {
            let rowCards: string[] = [];
            for (let col = 0; col < cols; col++) {
                const card = this.cardData[cardIndex];
                const x = startX + col * cardWidth;
                const y = startY + row * cardHeight;

                const cardImage = this.scene.add
                    .image(x, y, "BingoCard")
                    .setFrame(0)
                    .setDisplaySize(cardWidth, cardHeight)
                    .setOrigin(0.5, 0.5)
                    .setInteractive()
                    .setName(`cardImage_${card.key}`);

                const cardText = this.scene.add
                    .text(x, y, `${card.number}`, {
                        fontSize: "20px",
                        color: "#000",
                        fontStyle: "bold",
                    })
                    .setOrigin(0.5, 0.5)
                    .setName(`cardText_${card.key}`);

                card["text"] = cardText;

                cardImage.on("pointerdown", () => {
                    this.scene.checkCorrect(card, cardImage, cardText);
                });

                rowCards.push(card.key);
                cardIndex++;
            }
            console.log(`Dòng ${row + 1}:`, rowCards.join(" "));
        }

        const borderWidth = cols * cardWidth;
        const borderHeight = rows * cardHeight;
        const borderX = startX + borderWidth / 2 - cardWidth / 2;
        const borderY = startY + borderHeight / 2 - cardHeight / 2;

        this.scene.add
            .rectangle(borderX, borderY, borderWidth + 10, borderHeight + 10)
            .setStrokeStyle(15, 0x000000);
    }
}
