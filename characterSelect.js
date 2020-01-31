const DOMelement = document.getElementById("cardWrapper");

var houseIDs = [8, 17, 34, 52, 60, 66, 215, 229, 362, 398];
var houses = [];

var players = [];
var numberOfPlayers = 2;
var activePlayer = 0;
class Player {
  constructor(id, house, pawn) {
    this.id = id;
    this.pos = 0;
    this.house = house;
    this.pawn = new Image();
  }
}
function createPlayers() {
  for (let intP = 0; intP < numberOfPlayers; intP++) {
    players.push(new Player(intP));
  }
}
createPlayers();

function fetchChars() {
  let i = 0;
  for (let id of houseIDs) {
    fetch("https://anapioficeandfire.com/api/houses/" + id)
      .then(response => response.json())
      .then(function(data) {
        data.id = i;
        houses.push(data);
        if (houses.length === 10) {
          createCards();
        }
        i++;
      })
      .catch(error => console.log(error));
  }
}
fetchChars();

function createCards() {
  for (let house of houses) {
    let cardWrapper = document.createElement("div");
    cardWrapper.class = "card";
    cardWrapper.addEventListener("click", function() {
      selectHouse(house.id);
    });

    let houseImage = document.createElement("img");
    houseImage.src = "img/" + house.name + ".png";
    houseImage.setAttribute("max-width", "100px");
    houseImage.setAttribute("max-height", "100px");

    let houseName = document.createElement("h2");
    houseName.appendChild(document.createTextNode(house.name));

    //from here down is for stuff u need api for
    let founderContainer = document.createElement("div");
    let founderContent = document.createElement("span");
    if (house.founder) {
      fetch(house.founder)
        .then(response => {
          return response.json();
        })
        .then(founder => {
          founderContent.appendChild(
            document.createTextNode("founder: " + founder.name)
          );
        });
    } else {
      founderContent.appendChild(document.createTextNode("founder: unknown"));
    }
    founderContainer.appendChild(founderContent);

    //appending stuff to website
    cardWrapper.appendChild(houseImage);
    cardWrapper.appendChild(houseName);
    cardWrapper.appendChild(founderContainer);
    DOMelement.appendChild(cardWrapper);
  }
}

function selectHouse(houseID) {
  console.log("hellooo");
  players[activePlayer].house = houses[houseID];
  activePlayer = (activePlayer + 1) % numberOfPlayers;
}

function startGame() {
  if (players.every(player => player.house)) {
    localStorage.setItem("players", JSON.stringify(players));
    window.location = "game.html";
  } else {
    window.alert("Please do select two players to start the game");
  }
}
