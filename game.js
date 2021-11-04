function Buni() {
  this.dBuni = 100;
  this.htmlElement = document.getElementById("Buni");
  this.id = this.htmlElement.id;
  this.x = this.htmlElement.offsetLeft;
  this.y = this.htmlElement.offsetTop;

  this.fitBounds = function () {
    let parent = this.htmlElement.parentElement;
    let iw = this.htmlElement.offsetWidth;
    let ih = this.htmlElement.offsetHeight;
    let l = parent.offsetLeft;
    let t = parent.offsetTop;
    let w = parent.offsetWidth;
    let h = parent.offsetHeight;
    if (this.x < 0) this.x = 0;
    if (this.x > w - iw) this.x = w - iw;
    if (this.y < 0) this.y = 0;
    if (this.y > h - ih) this.y = h - ih;
  };
  this.move = function (xDir, yDir) {
    this.fitBounds(); //we add this instruction to keep buni within board
    this.x += this.dBuni * xDir;
    this.y += this.dBuni * yDir;
    this.display();
  };
  this.display = function () {
    this.htmlElement.style.left = this.x + "px";
    this.htmlElement.style.top = this.y + "px";
    this.htmlElement.style.display = "absolute";
  };
}
function start() {
  //create buni
  Buni = new Buni();
  // Add an event listener to the keypress event.
  document.addEventListener("keydown", moveBuni, false);
  //create new array for cupcakes
  cupcakes = new Array();
  //create cupcakes
  makeCupcakes();
}
// Handle keyboad events
// to move Buni
function moveBuni(e) {
  //codes of the four keys
  const KEYUP = 38;
  const KEYDOWN = 40;
  const KEYLEFT = 37;
  const KEYRIGHT = 39;
  if (e.keyCode == KEYRIGHT) {
    Buni.move(1, 0);
  } // right key
  if (e.keyCode == KEYLEFT) {
    Buni.move(-1, 0);
  } // left key
  if (e.keyCode == KEYUP) {
    Buni.move(0, -1);
  } // up key
  if (e.keyCode == KEYDOWN) {
    Buni.move(0, 1);
  } // down key
}

class Cupcakes {
  constructor(cupcakesNumber) {
    //the HTML element corresponding to the IMG of the cupcakes
    this.htmlElement = createCupcakesImg(cupcakesNumber);
    //iits HTML ID
    this.id = this.htmlElement.id;
    //the left position (x)
    this.x = this.htmlElement.offsetLeft;
    //the top position (y)
    this.y = this.htmlElement.offsetTop;
    this.move = function (dx, dy) {
      //move the cupcakes by dx, dy
      this.x += dx;
      this.y += dy;
      this.display();
    };

    this.display = function () {
      //adjust position of the cupcakes and display it
      this.fitBounds(); //add this to adjust to bounds
      this.htmlElement.style.left = this.x + "px";
      this.htmlElement.style.top = this.y + "px";
      this.htmlElement.style.display = "block";
    };
    this.fitBounds = function () {
      //check and make sure the cupcakes stays in the board space
      let parent = this.htmlElement.parentElement;
      let iw = this.htmlElement.offsetWidth;
      let ih = this.htmlElement.offsetHeight;
      let l = parent.offsetLeft;
      let t = parent.offsetTop;
      let w = parent.offsetWidth;
      let h = parent.offsetHeight;
      if (this.x < 0) this.x = 0;
      if (this.x > w - iw) this.x = w - iw;
      if (this.y < 0) this.y = 0;
      if (this.y > h - ih) this.y = h - ih;
    };
  }
}

function createCupcakesImg(wNum) {
  //get dimension and position of board div
  let boardDiv = document.getElementById("board");
  let boardDivW = boardDiv.offsetWidth;
  let boardDivH = boardDiv.offsetHeight;
  let boardDivX = boardDiv.offsetLeft;
  let boardDivY = boardDiv.offsetTop;
  //create the IMG element
  let img = document.createElement(
    "https://64.media.tumblr.com/c138e2cae71741ee051c2b598894ac08/tumblr_peblsbT5hs1rppicco1_75sq.gifv"
  );
  img.setAttribute("src", "images/cupcakes.gif");
  img.setAttribute("width", "100");
  img.setAttribute("alt", "cupcakes!");
  img.setAttribute("id", "cupcakes" + wNum);
  img.setAttribute("class", "cupcakes"); //set class of html tag img
  //add the IMG element to the DOM as a child of the board div
  img.style.position = "absolute";
  boardDiv.appendChild(img);
  //set initial position
  let x = getRandomInt(boardDivW);
  let y = getRandomInt(boardDivH);
  img.style.left = boardDivX + x + "px";
  img.style.top = y + "px";
  //return the img object
  return img;
}

function makeCupcakes() {
  //get number of bees specified by the user
  let nbCupcakes = document.getElementById("nbCupcakes").value;
  nbCupcakes = Number(nbCupcakes); //try converting the content of the input to a number
  if (isNaN(nbCupcakes)) {
    //check that the input field contains a valid number
    window.alert("Invalid number of cupcakes");
    return;
  }
  //create bees
  let i = 1;
  while (i <= nbCupcakes) {
    var num = i;
    var cupcakes = new Cupcakes(num); //create object and its IMG element
    cupcakes.display(); //display the bee
    Cupcakes.push(cupcakes); //add the bee object to the bees array
    i++;
  }
}

function moveCupcakes() {
  //get speed input field value
  let speed = document.getElementById("speedCupcakes").value;
  //move each bee to a random location
  for (let i = 0; i < cupcakes.length; i++) {
    let dx = getRandomInt(2 * speed) - speed;
    let dy = getRandomInt(2 * speed) - speed;
    cupcakes[i].move(dx, dy);
  }
}
function updateCupcakes() {
  // update loop for game
  //move the bees randomly
  moveCupcakes();
  //use a fixed update period
  let period = 10; //modify this to control refresh period
  //update the timer for the next move
  updateTimer = setTimeout("updateCupcakes()", period);
}
