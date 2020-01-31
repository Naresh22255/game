var board = document.getElementById("boardCanvas");
var ctx = board.getContext("2d");
console.log("Hiii");
var positions = [
  { x: 10, y: 555 },
  { x: 10, y: 450 },
  { x: 110, y: 450 },
  { x: 210, y: 450 },
  { x: 310, y: 450 },
  { x: 410, y: 450 },
  { x: 510, y: 450 },
  { x: 610, y: 450 },
  { x: 710, y: 450 },
  { x: 810, y: 450 },
  { x: 910, y: 450 },
  { x: 910, y: 350 },
  { x: 810, y: 350 },
  { x: 710, y: 350 },
  { x: 610, y: 350 },
  { x: 510, y: 350 },
  { x: 410, y: 350 },
  { x: 310, y: 350 },
  { x: 210, y: 350 },
  { x: 110, y: 350 },
  { x: 10, y: 350 },
  { x: 10, y: 250 },
  { x: 110, y: 250 },
  { x: 210, y: 250 },
  { x: 310, y: 250 },
  { x: 410, y: 250 },
  { x: 510, y: 250 },
  { x: 610, y: 250 },
  { x: 710, y: 250 },
  { x: 810, y: 250 },
  { x: 910, y: 250 },
  { x: 910, y: 150 },
  { x: 810, y: 150 },
  { x: 710, y: 150 },
  { x: 610, y: 150 },
  { x: 510, y: 150 },
  { x: 410, y: 150 },
  { x: 310, y: 150 },
  { x: 210, y: 150 },
  { x: 110, y: 150 },
  { x: 10, y: 150 },
  { x: 10, y: 50 },
  { x: 110, y: 50 },
  { x: 210, y: 50 },
  { x: 310, y: 50 },
  { x: 410, y: 50 },
  { x: 510, y: 50 },
  { x: 610, y: 50 },
  { x: 710, y: 50 },
  { x: 810, y: 50 },
  { x: 910, y: 50 }

  //   { x: 1050, y: 50 }
];

var traps = [
  { pos: 28, punnishment: 6 },
  { pos: 40, punnishment: 20 },
  { pos: 47, punnishment: 16 }
];

var boosters = [
  { pos: 2, reward: 37 },
  { pos: 19, reward: 41 },
  { pos: 24, reward: 45 }
];

const gameArea = document.getElementById("boardCanvas");
var players = JSON.parse(localStorage.getItem("players"));
var numberOfPlayers = players.length;
var activePlayer = 0;
var diceRoll = 0;

function drawMap() {
  ctx.clearRect(-9999, -9999, 19998, 19998);
  for (let i = 1; i <= positions.length - 1; i++) {
    var x = positions[i].x;
    var y = positions[i].y;
    let text;
    if (i < 10) {
      text = "0" + i;
    } else {
      text = i;
    }

    for (let trap of traps) {
      if (trap.pos === i) {
        ctx.fillStyle = "rgba(255,0,0,0.5)";
        ctx.fillRect(x, y, 100, 100);
      }
    }
    for (let boost of boosters) {
      if (boost.pos === i) {
        ctx.fillStyle = "rgba(0,255,0,0.5)";
        ctx.fillRect(x, y, 100, 100);
      }
    }
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, 100, 100);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "27px Comic Sans MS";
    ctx.fillText(text, x + 35, y + 60);
  }
  for (let boost of boosters) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.moveTo(positions[boost.pos].x + 50, positions[boost.pos].y + 50);
    ctx.lineTo(positions[boost.reward].x + 49, positions[boost.reward].y + 49);
    ctx.stroke();
  }
  for (let trap of traps) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.moveTo(positions[trap.pos].x + 50, positions[trap.pos].y + 50);
    ctx.lineTo(
      positions[trap.punnishment].x + 49,
      positions[trap.punnishment].y + 49
    );
    ctx.stroke();
  }
}

function createPlayers() {
  for (let player of players) {
    console.log(player);

    player.pawn = new Image();
    player.pawn.src = "img/" + player.house.name + ".png";
  }
}
createPlayers();

function placePlayers() {
  console.log("player " + activePlayer + ": " + players[activePlayer].pos);
  drawMap();
  let offset = 0;
  for (let player of players) {
    ctx.drawImage(
      player.pawn,
      positions[player.pos].x + 10 + offset,
      positions[player.pos].y + 25,
      50,
      50
    );
    offset += 30;
    checkIfWon();
  }
}

function movePlayer(currentPlayer, roll) {
  let move = 0;
  animatePlayer();
  function animatePlayer() {
    if (move < roll) {
      currentPlayer.pos += 1;
      placePlayers();
      setTimeout(animatePlayer, 500);
      move++;
    } else if (move === roll) {
      console.log("memes");
      checkIfBoost();
      checkIfTrap();
      nextPlayer();
    }
  }
}

function checkIfTrap() {
  for (let trap of traps) {
    if (trap.pos === players[activePlayer].pos) {
      players[activePlayer].pos = trap.punnishment;
      placePlayers();
    }
  }
}

function checkIfBoost() {
  for (let boost of boosters) {
    if (boost.pos === players[activePlayer].pos) {
      players[activePlayer].pos = boost.reward;
      placePlayers();
    }
  }
}

function checkIfWon() {
  if (players[activePlayer].pos >= positions.length) {
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("winner", JSON.stringify(players[activePlayer]));

    window.location = "victorypage.html";
  }
}

function rollDice() {
  diceRoll = Math.floor(Math.random() * 6 + 1);
  movePlayer(players[activePlayer], diceRoll);
  console.log("you rolled", diceRoll);
}

// var steps = document.querySelector("#diceWrapper");
// steps.innerHTML = "Go " + diceRoll + " steps.";

function nextPlayer() {
  if (diceRoll === 6) {
    window.alert("You Rolled 6, and get one more trow");
  } else {
    activePlayer = (activePlayer + 1) % numberOfPlayers;
  }
}

function init() {
  drawMap();
  placePlayers();
}
window.onload = function() {
  init();
};
