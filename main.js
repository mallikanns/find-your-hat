// JavaScript: Find your hat //
// <GitHub Repo: >

//Thinking process
// Step 1 : Set up working directory and elements
// Step 2 : Create class for creating instances of the game field
// Step 3 : Create the Game Grid and place Holes
// Step 4 : Place Home position and Hat position
// Step 5 : Create method to drives the main game loop

// Step 1 : Set up working directory and elements
const prompt = require("prompt-sync")({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
const clear = require("clear-screen"); //every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = "⭐";
const hole = "🌳";
const fieldCharacter = "⬛";
const pathCharacter = "👻";

// Step 2 : Create class for creating instances of the game field
class Field {
  constructor(field = [[]]) {
    //The Field constructor take a two-dimensional array
    // Step 4 : Place Home position and Hat position
    this.positionY = Math.floor(Math.random() * this.field.length);
    this.positionX = Math.floor(Math.random() * this.field[0].length);
    this.hatPositionY = Math.floor(Math.random() * this.field.length);
    this.hatPositionX = Math.floor(Math.random() * this.field[0].length);
    // Check is the hat position is in the same position as the home
    while (
      this.positionY === this.hatPositionY &&
      this.positionX === this.hatPositionX
    ) {
      this.positionY = Math.floor(Math.random() * this.field.length);
      this.positionX = Math.floor(Math.random() * this.field[0].length);
    }
    // Set Home position and Hat position
    this.field[this.positionY][this.positionX] = pathCharacter;
    this.field[this.hatPositionY][this.hatPositionX] = hat;
  }

  // Step 3 : Create the Game Grid and place Holes
  static generateField(height, width, percentage = 0.2) {
    // Create 1D array by height
    let field = new Array(height);
    //Create 2D array by loop 1D array
    for (let i = 0; i < field.length; i++) {
      field[i] = new Array(width);
      // Place Holes
      for (let j = 0; j < field[0].length; j++) {
        const random = Math.random(); // To campare with percentage
        field[i][j] = random > percentage ? fieldCharacter : hole;
      }
    }
    return field;
  }

  // Step 5 : Create method to drives the main game loop
  play() {
    let playing = true;
    this.instruction();
    while (playing) {
      this.print();
      this.acceptInput();
      if (!this.isInBounds()) {
        console.log("YOU LOSE, IT'S OUT OF BOUNDS!");
        playing = false;
        break;
      } else if (this.isHole()) {
        console.log("YOU LOSE, YOU FELL DOWN A HOLE!");
        playing = false;
        break;
      } else if (this.isHat()) {
        console.log("YOU WIN, YOU FOUND THE HAT!");
        playing = false;
        break;
      }
      // Update current position on the map
      this.field[this.positionY][this.positionX] = pathCharacter;
    }
  }
}
