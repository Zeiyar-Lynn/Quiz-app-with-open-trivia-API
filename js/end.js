const score = document.getElementById('score');
const usrname = document.getElementById('username');
const save = document.getElementById('save');

let points = JSON.parse(localStorage.getItem('ldr-board'));
score.innerHTML = points['score']+' points';

usrname.addEventListener('keyup', enable);
save.addEventListener('click', addToLocal); 

function enable(e) {
   save.disabled = !usrname.value; // better way
}

function addToLocal(e) {
   points[usrname.value] = points.score;
   localStorage.setItem('ldr-board', JSON.stringify(points));
   usrname.value = '';
}
