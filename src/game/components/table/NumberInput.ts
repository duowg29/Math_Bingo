// NumberInput.ts
import Phaser from 'phaser';

export class NumberInput extends Phaser.GameObjects.Container {
  private bg: Phaser.GameObjects.Rectangle;
  private displayText: Phaser.GameObjects.Text;
  private value: number;
  public eventEmitter: Phaser.Events.EventEmitter;
  private isEditing: boolean = false;
  private editingText: string = "";

  /**
   * @param scene - The scene this component belongs to.
   * @param x - The x position.
   * @param y - The y position.
   * @param width - The width of the input field.
   * @param height - The height of the input field.
   * @param initialValue - The starting number.
   */
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number = 80,
    height: number = 40,
    initialValue: number = 0
  ) {
    super(scene, x, y);

    this.value = initialValue;
    this.eventEmitter = new Phaser.Events.EventEmitter();

    // Create a background rectangle with a border.
    this.bg = scene.add
      .rectangle(0, 0, width, height, 0xffffff)
      .setOrigin(0.5)
      .setStrokeStyle(2, 0x000000);

    // Create a text object to display the current value.
    this.displayText = scene.add
      .text(0, 0, this.value.toString(), { fontSize: '24px', color: '#000' })
      .setOrigin(0.5);

    this.add([this.bg, this.displayText]);

    // Define the interactive area for the container.
    this.setSize(width, height);
    this.setInteractive(
      new Phaser.Geom.Rectangle(-width / 2, -height / 2, width, height),
      Phaser.Geom.Rectangle.Contains
    );

    // Start editing on click.
    this.on('pointerdown', () => {
      if (!this.isEditing) {
        this.startEditing();
      }
    });

    scene.add.existing(this);
  }

  // Puts the input field into editing mode.
  private startEditing() {
    this.isEditing = true;
    this.editingText = this.displayText.text; // Begin with current text.
    // Highlight border to indicate editing mode.
    this.bg.setStrokeStyle(2, 0x00ff00);
    // Listen for keyboard events.
    if (this.scene.input.keyboard) {
        this.scene.input.keyboard.on('keydown', this.handleKeyInput, this);
    }
  }

  // Handles keyboard input while editing.
  private handleKeyInput(event: KeyboardEvent) {
    if (!this.isEditing) return;

    if (event.key === 'Enter') {
      this.commitEditing();
    } else if (event.key === 'Backspace') {
      this.editingText = this.editingText.slice(0, -1);
      this.displayText.setText(this.editingText);
    } else {
      // Only allow digit input.
      if (/^[0-9]$/.test(event.key)) {
        this.editingText += event.key;
        this.displayText.setText(this.editingText);
      }
    }
  }

  // Ends editing, commits the new value, and emits an event.
  private commitEditing() {
    this.isEditing = false;
    if (this.scene.input.keyboard) {
        this.scene.input.keyboard.off('keydown', this.handleKeyInput, this);
    }

    let newValue = parseInt(this.editingText, 10);
    if (isNaN(newValue)) {
      newValue = this.value;
    }
    this.setValue(newValue);
    // Restore the original border color.
    this.bg.setStrokeStyle(2, 0x000000);
  }

  // Sets the internal value and updates the display.
  public setValue(newValue: number) {
    this.value = newValue;
    this.displayText.setText(this.value.toString());
    this.eventEmitter.emit('valueChanged', this.value);
  }

  // Returns the current value.
  public getValue(): number {
    return this.value;
  }
}
