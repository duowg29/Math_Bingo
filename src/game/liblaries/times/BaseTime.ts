import Phaser from 'phaser';

export type BaseTimeConfig = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  width: number;
  height: number;
  clockFace: 'circle' | 'rectangle' | 'progress';
  clockwise: boolean;
  startTime: number;
  interval: number;
  loop: boolean;
  borderColor?: string;
  borderWidth?: number;
  textColor?: string;
};

export class BaseTimeTimer extends Phaser.GameObjects.Container {
  private clockFace!: Phaser.GameObjects.Graphics;
  private timeText!: Phaser.GameObjects.Text;
  private movingHand!: Phaser.GameObjects.Line;
  private progressBar!: Phaser.GameObjects.Graphics;
  private elapsedTime: number = 0;
  private remainingTime: number;
  private isRunning: boolean = false;
  private timerEvent!: Phaser.Time.TimerEvent;
  private currentTime: number = 0;

  constructor(private config: BaseTimeConfig) {
    super(config.scene, config.x, config.y);
    config.scene.add.existing(this);

    this.remainingTime = config.startTime;
    this.createClockFace();
    this.createTimeText();
  }

  private createClockFace() {
    this.clockFace = this.config.scene.add.graphics();
    this.clockFace.lineStyle(this.config.borderWidth || 4, Phaser.Display.Color.HexStringToColor(this.config.borderColor || '#000').color);
    
    if (this.config.clockFace === 'circle') {
      this.clockFace.strokeCircle(0, 0, this.config.width / 2);
    } else if (this.config.clockFace === 'rectangle') {
      this.clockFace.strokeRect(-this.config.width / 2, -this.config.height / 2, this.config.width, this.config.height);
    } else if (this.config.clockFace === 'progress') {
      this.progressBar = this.config.scene.add.graphics();
      this.add(this.progressBar);
    }
    this.add(this.clockFace);
  }

  private createTimeText() {
    this.timeText = this.config.scene.add.text(0, this.config.height / 2 + 20, '00:00:00', {
      fontSize: '20px',
      color: this.config.textColor || '#fff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    this.add(this.timeText);
  }

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.timerEvent = this.config.scene.time.addEvent({
      delay: this.config.interval,
      callback: this.updateTime,
      callbackScope: this,
      loop: this.config.loop
    });
  }

  private updateTime() {
    this.elapsedTime += this.config.interval / 1000;
    this.remainingTime = Math.max(0, this.config.startTime - this.elapsedTime);
    this.currentTime = this.remainingTime;
    this.updateTimeText();

    if (this.remainingTime <= 0 && !this.config.loop) {
      this.stop();
    }
  }

  private updateTimeText() {
    const hours = Math.floor(this.remainingTime / 3600);
    const minutes = Math.floor((this.remainingTime % 3600) / 60);
    const seconds = Math.floor(this.remainingTime % 60);
    this.timeText.setText(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
  }

  public stop() {
    this.isRunning = false;
    this.timerEvent.remove(false);
  }
}
