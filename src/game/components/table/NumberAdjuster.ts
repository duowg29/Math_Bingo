// NumberAdjuster.ts
import Phaser from 'phaser';
import { NumberInput } from './NumberInput';

export class NumberAdjuster extends Phaser.GameObjects.Container {
  private min: number;
  private max: number;
  private numberInput: NumberInput;
  private minusButton: Phaser.GameObjects.Text;
  private plusButton: Phaser.GameObjects.Text;
  public eventEmitter: Phaser.Events.EventEmitter;

  /**
   * @param scene - The scene this component belongs to.
   * @param x - The x position.
   * @param y - The y position.
   * @param min - Minimum allowed value.
   * @param max - Maximum allowed value (must be > min).
   * @param initialValue - Optional starting value.
   */
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    min: number,
    max: number,
    initialValue?: number,
    direction?: string
  ) {
    super(scene, x, y);

    if (max <= min) {
      throw new Error('max must be greater than min.');
    }

    this.min = min;
    this.max = max;
    const startingValue =
      initialValue !== undefined ? Phaser.Math.Clamp(initialValue, min, max) : min;

    // Create a new NumberInput instance.
    this.numberInput = new NumberInput(scene, 0, 0, 80, 40, startingValue);

    // Create the minus button.
    this.minusButton = scene.add
      .text(0, 0, '-', {
        fontSize: '32px',
        backgroundColor: '#ccc',
        color: '#000',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
      })
      .setInteractive({ useHandCursor: true });

    // Create the plus button.
    this.plusButton = scene.add
      .text(0, 0, '+', {
        fontSize: '32px',
        backgroundColor: '#ccc',
        color: '#000',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
      })
      .setInteractive({ useHandCursor: true });
    
    // Position the elements.
    if(direction == 'horizontal') {
      this.minusButton.setPosition(-120, -20);
      this.numberInput.setPosition(0, 0);
      this.plusButton.setPosition(120, -20);
    } else {
      this.plusButton.setPosition(0, -60);
      this.numberInput.setPosition(0, 0);
      this.minusButton.setPosition(0, 60);
    }

    // Add elements to this container.
    this.add([this.minusButton, this.numberInput, this.plusButton]);

    // Create an event emitter for this component.
    this.eventEmitter = new Phaser.Events.EventEmitter();

    // Listen for value changes from NumberInput.
    this.numberInput.eventEmitter.on('valueChanged', (value: number) => {
      // Clamp value between min and max.
      const clampedValue = Phaser.Math.Clamp(value, this.min, this.max);
      if (clampedValue !== value) {
        // If out of bounds, update the input.
        this.numberInput.setValue(clampedValue);
      }
      this.updateButtonStates();
      this.eventEmitter.emit('valueChanged', clampedValue);
    });

    // Set up button events.
    this.minusButton.on('pointerdown', () => this.decrement());
    this.plusButton.on('pointerdown', () => this.increment());

    // Update initial button states.
    this.updateButtonStates();

    scene.add.existing(this);
  }

  // Updates the interactivity and appearance of the buttons.
  private updateButtonStates() {
    const currentValue = this.numberInput.getValue();

    if (currentValue <= this.min) {
      this.minusButton.setAlpha(0.5);
      this.minusButton.disableInteractive();
    } else {
      this.minusButton.setAlpha(1);
      this.minusButton.setInteractive({ useHandCursor: true });
    }

    if (currentValue >= this.max) {
      this.plusButton.setAlpha(0.5);
      this.plusButton.disableInteractive();
    } else {
      this.plusButton.setAlpha(1);
      this.plusButton.setInteractive({ useHandCursor: true });
    }
  }

  // Increases the value by 1 if below maximum.
  public increment() {
    const currentValue = this.numberInput.getValue();
    if (currentValue < this.max) {
      this.numberInput.setValue(currentValue + 1);
    }
  }

  // Decreases the value by 1 if above minimum.
  public decrement() {
    const currentValue = this.numberInput.getValue();
    if (currentValue > this.min) {
      this.numberInput.setValue(currentValue - 1);
    }
  }
}
