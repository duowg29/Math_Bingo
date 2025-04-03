import Phaser from "phaser";
import { BingoDTO } from "../dto/BingoDTO";
import { CardDTO } from "../dto/CardDTO";
import { BingoData } from "../data/BingoData";
import { CardData } from "../data/CardData";
import { CalculationDTO } from "../dto/CalculationDTO";
import { CalculationData } from "../data/CalculationData";
import TimerManager from "../utilities/TimerManager";
import SoundManager from "../utilities/SoundManager";
import CardDrawer from "../utilities/CardDrawer";
import CalculationDrawer from "../utilities/CalculationDrawer";

export default class GamePlayScene extends Phaser.Scene {
    private bingo: BingoDTO;
    private cardData: CardDTO[] = [];
    public soundManager: SoundManager | null = null;
    private currentCalculation: CalculationDTO;
    private calculationText: Phaser.GameObjects.Text;
    private usedIndexes: Set<number> = new Set();
    private duration: number;
    private timerManager: TimerManager;
    private removedIndexes: Set<number> = new Set();
    private calculationDrawer: CalculationDrawer;

    constructor() {
        super({ key: "GamePlayScene" });
    }

    init(data: { operator: string; duration: number }): void {
        const bingoConfig = BingoData[0];
        this.bingo = new BingoDTO(
            bingoConfig.id,
            bingoConfig.cols,
            bingoConfig.rows,
            [data.operator]
        );

        this.duration = data.duration;

        this.timerManager = new TimerManager(
            this,
            this.duration,
            this.onTimeOut.bind(this)
        );
        this.calculationDrawer = new CalculationDrawer(this);
        this.updateCalculation(data.operator);
    }

    preload(): void {
        this.load.spritesheet("explosion", "assets/sprite/explosion.png", {
            frameWidth: 160,
            frameHeight: 160,
        });
        this.load.atlas(
            "BingoCard",
            "assets/BingoCard.png",
            "assets/BingoCard.json"
        );
        this.load.atlas(
            "CalculationCard",
            "assets/CalculationCard.png",
            "assets/CalculationCard.json"
        );
        this.load.image("whiteBg", "assets/images/whiteBg.png");
        this.soundManager = new SoundManager(this, [
            "ScoreMusic",
            "BackgroundMusic",
        ]);
        this.soundManager.preload();
    }

    create(): void {
        if (this.soundManager) {
            this.soundManager.play("BackgroundMusic", true);
        }
        if (this.soundManager) {
            this.soundManager.play("ScoreMusic", false);
        }
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {
                start: 0,
                end: 8,
            }),
            frameRate: 10,
            repeat: 0,
        });
        this.add
            .image(
                this.cameras.main.centerX,
                this.cameras.main.centerY,
                "whiteBg"
            )
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        const selectedOperator = this.bingo.operator[0];
        const filteredData = CalculationData.filter((calc) =>
            calc.operator.includes(selectedOperator)
        );

        this.cardData = filteredData.slice(0, 25).map((calc, index) => {
            const cardInfo = CardData[index];
            return new CardDTO(
                `card${index + 1}`,
                calc.result,
                cardInfo.width,
                cardInfo.height,
                false
            );
        });

        this.calculationDrawer.drawCalculation(this.currentCalculation);

        if (!this.calculationText) {
            this.calculationText = this.add
                .text(this.cameras.main.centerX, 150, "", {
                    fontSize: "24px",
                    color: "#000",
                    fontStyle: "bold",
                    align: "center",
                })
                .setOrigin(0.5, 0.5);
        }

        this.calculationText.setText(
            this.calculationDrawer.getCalculationText(this.currentCalculation)
        );
        const cardDrawer = new CardDrawer(this, this.bingo, this.cardData);
        cardDrawer.drawCards();

        const timerX = this.cameras.main.centerX;
        const timerY = 70;
        const timerRadius = 40;

        const timerClock = this.add.graphics();
        timerClock.lineStyle(4, 0x000000, 1);
        timerClock.strokeCircle(timerX, timerY, timerRadius);

        const timerArc = this.add.graphics();
        timerArc.setDepth(1);

        let remainingTime = this.duration;
        const initialAngle = Phaser.Math.DegToRad(270);

        const updateClock = () => {
            timerArc.clear();

            remainingTime = Math.max(0, this.timerManager.getRemainingTime());

            if (remainingTime <= 0) {
                this.onTimeOut();
                return;
            }

            const progress = remainingTime / this.duration;
            const endAngle = initialAngle - progress * Phaser.Math.PI2;

            timerArc.fillStyle(0x007bff, 1);
            timerArc.slice(
                timerX,
                timerY,
                timerRadius - 5,
                initialAngle,
                endAngle,
                true
            );
            timerArc.fillPath();
        };

        this.time.addEvent({
            delay: 1000 / 60,
            callback: updateClock,
            callbackScope: this,
            loop: true,
        });

        this.timerManager.start();
        this.scale.on("resize", this.resize, this);
    }
    resize(gameSize: Phaser.Structs.Size): void {
        const width = gameSize.width;
        const height = gameSize.height;
        this.cameras.resize(width, height);
    }
    onTimeOut(): void {
        const answerToRemove = this.currentCalculation.result;

        const cardIndex = this.cardData.findIndex(
            (card) => card.number === answerToRemove
        );

        if (cardIndex !== -1) {
            const card = this.cardData[cardIndex];
            const cardKey = card.key;

            console.log(`⏳ Hết thời gian! Xóa thẻ: ${cardKey}`);

            const cardImage = this.children
                .getChildren()
                .find(
                    (child) =>
                        child instanceof Phaser.GameObjects.Image &&
                        child.name === `cardImage_${cardKey}`
                ) as Phaser.GameObjects.Image;
            cardImage.setTint(0xff0000);

            const cardText = this.children
                .getChildren()
                .find(
                    (child) =>
                        child instanceof Phaser.GameObjects.Text &&
                        child.name === `cardText_${cardKey}`
                ) as Phaser.GameObjects.Text;

            if (cardImage && cardText) {
                this.tweens.add({
                    targets: cardImage,
                    y: cardImage.y - 10,
                    duration: 100,
                    yoyo: true,
                    repeat: 1,
                });

                this.time.delayedCall(1000, () => {
                    cardImage.destroy();
                    cardText.destroy();
                });
            } else {
                this.checkCorrect(card, cardImage, cardText);
            }

            this.removedIndexes.add(cardIndex);
            this.cardData[cardIndex] = new CardDTO("", 0, 0, 0, false);

            console.log(`🔴 Đã xóa card ${cardKey} trên logic và UI`);
        }

        this.updateCalculation(this.bingo.operator[0]);
        this.calculationText.setText(
            this.calculationDrawer.getCalculationText(this.currentCalculation)
        );

        this.timerManager.reset();
    }

    checkWin(): boolean {
        const { cols, rows } = this.bingo;
        for (let row = 0; row < rows; row++) {
            let markedCount = 0;
            let winningCells: Phaser.GameObjects.Image[] = [];

            for (let col = 0; col < cols; col++) {
                const index = row * cols + col;
                const card = this.cardData[index];
                if (card.marked) {
                    markedCount++;
                    winningCells.push(this.getCardImageByIndex(index));
                } else {
                    markedCount = 0;
                    winningCells = [];
                }

                if (markedCount === 5) {
                    winningCells.forEach((cardImage) => {
                        cardImage.setTint(0xffff00);
                    });
                    return true;
                }
            }
        }

        for (let col = 0; col < cols; col++) {
            let markedCount = 0;
            let winningCells: Phaser.GameObjects.Image[] = [];

            for (let row = 0; row < rows; row++) {
                const index = row * cols + col;
                const card = this.cardData[index];
                if (card.marked) {
                    markedCount++;
                    winningCells.push(this.getCardImageByIndex(index));
                } else {
                    markedCount = 0;
                    winningCells = [];
                }

                if (markedCount === 5) {
                    winningCells.forEach((cardImage) => {
                        cardImage.setTint(0xffff00);
                    });
                    return true;
                }
            }
        }

        return false;
    }

    getCardImageByIndex(index: number): Phaser.GameObjects.Image {
        const card = this.cardData[index];
        return this.children
            .getChildren()
            .find(
                (child) =>
                    child instanceof Phaser.GameObjects.Image &&
                    child.name === `cardImage_${card.key}`
            ) as Phaser.GameObjects.Image;
    }

    checkCorrect(
        card: CardDTO,
        cardImage: Phaser.GameObjects.Image,
        cardText: Phaser.GameObjects.Text
    ): void {
        if (card.number === this.currentCalculation.result && !card.marked) {
            if (this.soundManager) {
                this.soundManager.play("ScoreMusic", false);
            }
            const explosion1 = this.add
                .sprite(200, 100, "explosion")
                .setDisplaySize(150, 150);
            explosion1.play("explode");
            explosion1.on("animationcomplete", () => explosion1.destroy());

            const explosion2 = this.add
                .sprite(600, 100, "explosion")
                .setDisplaySize(150, 150);
            explosion2.play("explode");
            explosion2.on("animationcomplete", () => explosion2.destroy());

            card.marked = true;
            cardImage.setTint(0x00ff00);
            cardImage.disableInteractive();
            this.tweens.add({
                targets: cardImage,
                y: cardImage.y - 10,
                duration: 100,
                yoyo: true,
                repeat: 1,
            });
            const filteredData = CalculationData.filter((calc) =>
                calc.operator.includes(this.bingo.operator[0])
            );
            const currentIndex = filteredData.findIndex(
                (calc) =>
                    calc.valueA === this.currentCalculation.valueA &&
                    calc.valueB === this.currentCalculation.valueB &&
                    calc.result === this.currentCalculation.result
            );

            if (currentIndex !== -1) {
                this.usedIndexes.add(currentIndex);
            }

            this.timerManager.reset(this.duration);

            if (this.checkWin()) {
                this.time.delayedCall(3000, () => {
                    if (this.soundManager) {
                        this.soundManager.stop("BackgroundMusic");
                    }
                    this.scene.start("EndScene");
                });
            } else {
                this.updateCalculation(this.bingo.operator[0]);
                this.calculationText.setText(
                    this.calculationDrawer.getCalculationText(
                        this.currentCalculation
                    )
                );
            }
        } else {
            cardImage.setTint(0xff0000);

            console.log(
                `Clicked card: ${card.key}, Index: ${this.cardData.findIndex(
                    (c) => c.key === card.key
                )}`
            );

            const incorrectAnswer = card.number;
            const filteredData = CalculationData.filter((calc) =>
                calc.operator.includes(this.bingo.operator[0])
            );
            const indexToRemove = filteredData.findIndex(
                (calc, index) =>
                    calc.result === incorrectAnswer &&
                    !this.removedIndexes.has(index) &&
                    !this.usedIndexes.has(index)
            );

            if (indexToRemove !== -1) {
                this.removedIndexes.add(indexToRemove);
                const cardIndex = this.cardData.findIndex(
                    (c) => c.key === card.key
                );
                console.log(
                    `Clicked card: ${card.key} (Expected Index: ${
                        cardIndex + 1
                    })`
                );

                if (cardIndex !== -1) {
                    console.log(
                        `🔴 Xóa card: ${this.cardData[cardIndex]?.key}`
                    );
                    this.cardData[cardIndex] = new CardDTO("", 0, 0, 0, false);
                }
                console.log(
                    `Removed question: ${
                        CalculationData[indexToRemove].valueA
                    } ${this.calculationDrawer.convertOperatorToSymbol(
                        CalculationData[indexToRemove].operator[0]
                    )} ${CalculationData[indexToRemove].valueB} = ${
                        CalculationData[indexToRemove].result
                    }`
                );
            }
            this.tweens.add({
                targets: cardImage,
                y: cardImage.y - 10,
                duration: 100,
                yoyo: true,
                repeat: 1,
            });

            this.time.delayedCall(1000, () => {
                cardImage.destroy();
                cardText.destroy();
            });

            this.timerManager.reset(this.duration);

            if (!this.checkRemainingWinningPaths()) {
                if (this.soundManager) {
                    this.soundManager.stop("BackgroundMusic");
                }
                this.scene.start("LostScene");
            } else {
                this.updateCalculation(this.bingo.operator[0]);
                this.calculationText.setText(
                    this.calculationDrawer.getCalculationText(
                        this.currentCalculation
                    )
                );
            }
        }
    }
    checkRemainingWinningPaths() {
        const { cols, rows } = this.bingo;
        for (let row = 0; row < rows; row++) {
            const rowCards = [...Array(cols)].map(
                (_, col) => this.cardData[row * cols + col]
            );

            const rowKeys = rowCards
                .map((card) => (card ? card.key : "null"))
                .join(" ");
            console.log(`Hàng ${row + 1}: ${rowKeys}`);

            const validRowCards = rowCards.filter(
                (card) => card && card.key !== ""
            ).length;

            if (validRowCards === cols) {
                console.log(`✅ Hàng ${row + 1} vẫn còn đầy đủ các ô hợp lệ.`);
                return true;
            }
        }

        for (let col = 0; col < cols; col++) {
            const colCards = [...Array(rows)].map(
                (_, row) => this.cardData[row * cols + col]
            );

            const colKeys = colCards
                .map((card) => (card ? card.key : "null"))
                .join(" ");
            console.log(`Cột ${col + 1}: ${colKeys}`);

            const validColCards = colCards.filter(
                (card) => card && card.key !== ""
            ).length;

            if (validColCards === rows) {
                console.log(`✅ Cột ${col + 1} vẫn còn đầy đủ các ô hợp lệ.`);
                return true;
            }
        }

        return false;
    }

    updateCalculation(operator: string): void {
        const filteredData = CalculationData.filter((calc) =>
            calc.operator.includes(operator)
        );

        const unusedCalculations = filteredData.filter(
            (_, index) =>
                !this.usedIndexes.has(index) && !this.removedIndexes.has(index)
        );

        if (unusedCalculations.length === 0) {
            if (this.soundManager) {
                this.soundManager.stop("BackgroundMusic");
            }
            this.scene.start("LostScene");
            return;
        }
        if (!this.calculationDrawer) {
            console.error("calculationDrawer is not initialized!");
        }
        const randomCalculation =
            unusedCalculations[
                Math.floor(Math.random() * unusedCalculations.length)
            ];

        this.currentCalculation = new CalculationDTO(
            randomCalculation.valueA,
            randomCalculation.valueB,
            randomCalculation.result,
            [operator]
        );
    }
    update(): void {
        const remainingTime = Math.max(0, this.timerManager.getRemainingTime());

        if (remainingTime <= 0) {
            this.timerManager.stop();
        }
    }
}
