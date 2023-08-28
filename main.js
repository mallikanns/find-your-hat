// JavaScript: Find your hat //
// <GitHub Repo: >

//Thinking process
// Step 1 : Set up working directory and elements
// Step 2 : Create class for creating instances of the game field
// Step 3 : Create the Game Grid and place Holes
// Step 4 : Place Home position and Hat position
// Step 5 : Create method to drives the main game loop
// Step 6 : Display the instruction
// Step 7 : Display the Field map
// Step 8 : Ask question, accept user input and updating the current position
// Step 9 : Test the current location results

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
    this.field = field;
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
      //Test the current location results
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

  // Step 6 : Display the instruction
  instruction() {
    console.log(
      "** INSTRUCTIONS - FIND THE HAT! ** \nType U, D, L, R, (Up, Down, Left, Right) and press enter to find the hat\nPress Ctrl + C to exit.\n"
    );
  }

  // Step 7 : Display the Field map
  print() {
    // Formats arrays as strings
    const displayStringField = this.field
      .map((row) => row.join(" "))
      .join("\n");
    clear();
    // Prints map in the console
    console.log(displayStringField);
  }

  // Step 8 : Ask question and accept user input
  acceptInput() {
    // Asking and accepting user input
    const answer = prompt(
      "Which way do you want to go? --> "
    ).toLocaleLowerCase();
    // Store the previous position for remove path character
    const prevPositionY = this.positionY;
    const prevPositionX = this.positionX;
    // Updating the current position
    switch (answer) {
      case "u":
        this.positionY--;
        break;
      case "d":
        this.positionY++;
        break;
      case "l":
        this.positionX--;
        break;
      case "r":
        this.positionX++;
        break;
      default:
        console.log("Invalid. Please enter U, D, L or R.");
        this.acceptInput();
        break;
    }
    // Remove the path character from the previous position
    this.field[prevPositionY][prevPositionX] = fieldCharacter;
  }

  // Step 9 : Test the current position results
  isInBounds() {
    return (
      this.positionY >= 0 &&
      this.positionX >= 0 &&
      this.positionY < this.field.length &&
      this.positionX < this.field[0].length
    );
  }
  isHole() {
    return this.field[this.positionY][this.positionX] === hole;
  }
  isHat() {
    return this.field[this.positionY][this.positionX] === hat;
  }
}

const newField = new Field(Field.generateField(10, 10, 0.3));
newField.play();
