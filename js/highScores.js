const highScores = document.getElementById('highScores');

let obj = JSON.parse(localStorage.getItem('ldr-board'));
let players = Object.keys(obj).slice(1);
players = players.sort((a,b) => obj[b] - obj[a]);

players.forEach(function(name) {
   let temp = document.createElement('li');
   temp.innerHTML = `${name} - ${obj[name]}`
   highScores.appendChild(temp);
});