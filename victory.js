let DOMWinner = document.getElementById("winnerText");

let winner = JSON.parse(localStorage.getItem("winner"));
let players = JSON.parse(localStorage.getItem("players"));

let winnerContent = document.createElement("h1");
winnerContent.appendChild(
  document.createTextNode(
    "Congatulation Player " +
      (winner.id + 1) +
      ", you brought " +
      winner.house.name +
      " to sit in the Iron Throne."
  )
);
DOMWinner.appendChild(winnerContent);
