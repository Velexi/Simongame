let order = []; //represents the sequence order computer chooses
let playerOrder = []; //represents the user's sequence
let flash; //number of flashes that appears in a true
let turn; //for counting user's turn
let good; //boolean that determinates if the user has entered a good or bad matching sequence
let compTurn; //boolean that determinates if it's the computer's turn or not
let intervalId; //sets up the interval for the flashing lights
let strict = false; //boolean that determinates if user uses strict mode or no
let noise = true; //if we're playing a noise
let on = false; //boolean that determinates if the game is turned on or not
let win; //if the player has won the game or not

// catching DOM (referencing HTML and CSS elements)

const turnCounter = document.querySelector('#turn');
const topLeft = document.querySelector('#topleft');
const topRight = document.querySelector('#topright');
const bottomLeft = document.querySelector('#bottomleft');
const bottomRight = document.querySelector('#bottomright');
const strictButton = document.querySelector('#strict');
const onButton = document.querySelector('#on');
const startButton = document.querySelector('#start');

//code starts here

strictButton.addEventListener('change', event => {
  //adds an event listner to the strict button  of type change (when it turns checked/unchecked)
  if (strictButton.checked == true) {
    // if the strict button is checked
    strict = true;
  } else {
    strict = false; // the strict button is not checked
  }
});

onButton.addEventListener('click', event => {
  //adds an event listner tot he Power button on the html page
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = '-'; //if the Power button is checked initialise the turnCounter and it will display a - on the div containing it
  } else {
    on = false;
    turnCounter.innerHTML = '';
    clearColor(); //clears the light from the color
    clearInterval(intervalId); //clears the interval
  }
});

startButton.addEventListener('click', event => {
  if (on || win) {
    //if on equals true or win equals true play the game
    play();
  }
});

function play() {
  //reinitializing variables
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    //according to SIMON! rules you have to complete 20 turns before wining the game
    order.push(Math.floor(Math.random() * 4) + 1); //adds the random sequence the order array
  }

  compTurn = true;

  intervalId = setInterval(gameTurn, 800); //set the interval for the light flashes to 800ms
}

function gameTurn() {
  on = false; //prevents the user from clicking buttons when the light flashes

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one(); //flashes the first corner
      if (order[flash] == 2) two(); //flashes the second corner
      if (order[flash] == 3) three(); //flashes the third corner
      if (order[flash] == 4) four(); //flashes the fourth corner
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById('clip1');
    audio.play();
  }

  noise = true;
  topLeft.style.backgroundColor = 'lightgreen';
}

function two() {
  if (noise) {
    let audio = document.getElementById('clip2');
    audio.play();
  }

  noise = true;
  topRight.style.backgroundColor = 'tomato';
}

function three() {
  if (noise) {
    let audio = document.getElementById('clip3');
    audio.play();
  }

  noise = true;
  bottomLeft.style.backgroundColor = 'yellow';
}

function four() {
  if (noise) {
    let audio = document.getElementById('clip4');
    audio.play();
  }

  noise = true;
  bottomRight.style.backgroundColor = 'lightskyblue';
}

function clearColor() {
  //resets the backroung of our 4 circle parts
  topLeft.style.backgroundColor = '#21d19f';
  topRight.style.backgroundColor = '#a31010';
  bottomLeft.style.backgroundColor = '#f4b266';
  bottomRight.style.backgroundColor = '#011627';
}

function flashColor() {
  //changes the style of our divs to make an effet of color flashing
  topLeft.style.backgroundColor = 'lightgreen';
  topRight.style.backgroundColor = 'tomato';
  bottomLeft.style.backgroundColor = 'yellow';
  bottomRight.style.backgroundColor = 'lightskyblue';
}

//adding event listeners to allow the user to click on the colors
topLeft.addEventListener('click', event => {
  if (on) {
    // we only allow the player to click only if the game is on
    playerOrder.push(1); //adds the index of topleft to the playOrder array;
    check(); //check if the player has entered the right sequence
    one();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

topRight.addEventListener('click', event => {
  if (on) {
    // we only allow the player to click only if the game is on
    playerOrder.push(2); //adds the index of topleft to the playOrder array;
    check(); //check if the player has entered the right sequence
    two();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomLeft.addEventListener('click', event => {
  if (on) {
    // we only allow the player to click only if the game is on
    playerOrder.push(3); //adds the index of topleft to the playOrder array;
    check(); //check if the player has entered the right sequence
    three();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

bottomRight.addEventListener('click', event => {
  if (on) {
    // we only allow the player to click only if the game is on
    playerOrder.push(4); //adds the index of topleft to the playOrder array;
    check(); //check if the player has entered the right sequence
    four();
    if (!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
});

function check() {
  //checks if the player's sequence is correct
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false;
  }

  if (playerOrder.length == 20 && good) {
    winGame();
  }

  if (good == false) {
    //if the user enters a false sequence the little box displays NO! then it goes back to the turn number it was on after 800ms (setTimeout();)
    flashColor();
    turnCounter.innerHTML = 'NO!';
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false; // we only play noise if the player enters a correct sequence
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }
}

function winGame() {
  flashColor();
  turnCounter.innerHTML = 'WIN!';
  on = false; // turning the game off because the user won
  win = true;
}
