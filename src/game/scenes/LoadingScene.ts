export default class LoadingScene extends Phaser.Scene {
    constructor() {
        super('LoadingScene');
    }

    preload() {
        this.load.image('logo', 'assets/images/MCT_logo.png');
        this.load.image('background', 'assets/images/MCT_background.png');
        this.load.image('title', 'assets/images/MCT_title.png');
        this.load.image('text_loading', 'assets/images/MCT_text_loading.png');
        this.load.image('effect', 'assets/images/MCT_effect.png');
        this.load.image('expression', 'assets/images/MCT_expression.png');

        this.load.image('diamond','assets/images/MCT_diamond.png');
        this.load.image('addition','assets/images/MCT_addition.png');
        this.load.image('subtraction','assets/images/MCT_subtraction.png');
        this.load.image('division','assets/images/MCT_division.png');
        this.load.image('infinitive','assets/images/MCT_infinitive.png');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(this.scale.width, this.scale.height);
        const container = this.add.container(this.scale.width / 2, this.scale.height / 2).setScale(1.5);
        const diamond = this.add.image(0,-100,'diamond').setDisplaySize(95,34).setOrigin(0.5,0.5).setScale(0);
        const addition = this.add.image(23,0,'addition').setDisplaySize(18,18).setOrigin(0.5,0.5).setScale(0);
        const subtraction = this.add.image(-23,0,'subtraction').setDisplaySize(20,7).setOrigin(0.5,0.5).setScale(0);
        const multiplication = this.add.image(0, 0, 'infinitive')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(19, 30)
            .setScale(0)
            .setCrop(41,0,18,50);

        const division1 = this.add.image(2,13,'division').setDisplaySize(7,7).setOrigin(0.5,0.5).setScale(0);
        const division2 = this.add.image(2,-13,'division').setDisplaySize(7,7).setOrigin(0.5,0.5).setScale(0);

        const fullWidth = 95;  
        const fullHeight = 47; 

        const infinitive1 = this.add.image(0, 0, 'infinitive')
            .setDisplaySize(fullWidth, fullHeight)
            .setOrigin(0.5, 0.5)
            .setCrop(41, 0, 18, fullHeight)
            .setScale(1)
            .setAlpha(0);

        const cropData = { x: 41, width: 18 };

        this.tweens.add({
            targets: cropData,  
            x: 0,               
            width: fullWidth,   
            duration: 1000,  
            ease: 'Linear',
            onUpdate: function () {
                infinitive1.setCrop(cropData.x, 0, cropData.width, fullHeight);
            },
            onComplete: () => {
                console.log('Hoàn thành');
            }
        });

        const text = this.add.text(0, 50, 'EM HỌC TOÁN', {
        fontSize: '20px Arial',
        fontStyle: 'bold',
        color: 'white',
        }).setOrigin(0.5).setResolution(2).setAlpha(0);
        
        container.add([text, addition, subtraction, division1, division2, multiplication, 
            infinitive1,
             diamond]);

        const duration = 150;
        
        this.tweens.add({
            targets: [addition], 
            scale: 1, 
            duration: duration, 
            ease: 'Back.easeOut',
            onComplete: () => {
                this.tweens.add({
                    targets: [subtraction], 
                    scale: 1, 
                    duration: duration, 
                    ease: 'Back.easeOut',
                    onComplete: () => {
                        this.tweens.add({
                            targets: [multiplication], 
                            scale: 1, 
                            duration: duration, 
                            ease: 'Back.easeOut',
                            onComplete: () => {
                                this.tweens.add({
                                    targets: [division1, division2], 
                                    scale: 1, 
                                    duration: duration, 
                                    ease: 'Back.easeOut',
                                    onComplete: () => {
                                        const cropData = { x: 41, width: 18 };
                                        this.tweens.add({
                                            targets: cropData,
                                            x: 0,               
                                            width: fullWidth,   
                                            duration: 1000,     
                                            ease: 'Linear',
                                            onUpdate: function () {
                                                infinitive1.setAlpha(1);
                                                infinitive1.setCrop(cropData.x, 0, cropData.width, fullHeight);
                                            },
                                            onComplete: () => {
                                                this.tweens.add({
                                                    targets: [diamond], 
                                                    scale: 1, 
                                                    y: -35,
                                                    duration: 1000, 
                                                    ease: 'Back.easeOut',
                                                    onComplete: () => {
                                                    this.tweens.add({
                                                        targets: text,
                                                        alpha: 1, 
                                                        duration: 1000,
                                                        ease: 'Linear',
                                                        onComplete: () => {
                                                            this.tweens.add({
                                                                targets: container,
                                                                y: container.y + 25,
                                                                duration: 1000,
                                                                yoyo: true, 
                                                                repeat: -1,
                                                                ease: 'Sine.easeInOut',
                                                            });
                                                        }
                                                    });

                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });


        this.add.text(this.scale.width / 2, this.scale.height / 2 + 430, 'Đang tải...', {
            fontSize: '25px Arial',
            fontStyle: 'bold',
            color: 'white',
        })
        .setOrigin(0.5)
        .setResolution(2)
        .setAlpha(0.5);

        const loadingBarWidth = 400; 
        const loadingBarX = this.scale.width / 2 - loadingBarWidth / 2; 
        const loadingBarY = this.scale.height / 2 + 400;

        const loadingBarBackground = this.add.rectangle(
            loadingBarX,
            loadingBarY,
            loadingBarWidth, 
            8,
            0xFFFFFF
        ).setOrigin(0, 0.5).setAlpha(0.5);

        const loadingBarFill = this.add.rectangle(
            loadingBarX,
            loadingBarY,
            0, 
            8,
            0xFFFFFF
        ).setOrigin(0, 0.5);

        const loadingText = this.add.text(loadingBarX + loadingBarWidth / 2, loadingBarY - 20, '0%', {
            fontSize: '20px Arial',
            color: 'white',
        }).setOrigin(0.5);

        const loadingDuration = 3000;

        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: loadingDuration,
            onUpdate: (tween) => {
                const value = Math.round(tween.getValue());
                loadingBarFill.width = (value / 100) * loadingBarWidth;
                loadingText.setText(`${value}%`); 
            },
            onComplete: () => {
                // this.scene.start('GamePlayScene'); 
            },
        });
    }

    update() {}
}
