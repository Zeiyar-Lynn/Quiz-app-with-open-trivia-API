const question = document.getElementById('question');
const choices = document.getElementsByClassName('choice');
const choiceCtr = document.getElementById('choiceCtr');
const questNO = document.getElementById('questNo');
const score = document.getElementById('score');
const progress = document.getElementById('progress');


questions = [];
fetch("https://opentdb.com/api.php?amount=7&category=31&difficulty=easy&type=multiple")
.then(x => {
   return x.json();
})
.then(q => {
   let questions = q.results;
   questions.forEach((que) => {
      // console.log(que.question);
   });
   let quest = questions.map((que) =>{
      let choice = [], temp = [...que.incorrect_answers, que.correct_answer];
      for(let i=0; i<4; i++) {
         let ind = (Math.random()*temp.length)|0;
         choice[i] = temp[ind];
         temp.splice(ind, 1);
      }

      const obj = {};
      obj["question"] = que.question;
      obj["choices"] = choice;
      obj["answer"] = que.correct_answer;
      // console.log(que.question);
      return obj;
   });
   console.log(quest);
   createMCQ(quest[0]);
   startGame(quest)
   progress.style.width = `${(i/maxQuest)*100}%`;
})

// Events

// functions
function startGame(quest) {
   choiceCtr.addEventListener('click', (e) => {
      nextQ(e, quest)
   });
}

function createMCQ(quest) {
   let j = 0;
   question.innerHTML = quest.question;
   Array.from(choices).forEach(function(choice) {
      // let prop = 'choice' + j;
      choice.innerText = quest["choices"][j];
      j++;
   });
}

let i = 1, maxQuest = 7, points = 0;

function nextQ(e, questions) {
   if (e.target.className === 'choices' && i < maxQuest) {
      e.preventDefault();
      let cond = 'incorrect';
      if (e.target.lastElementChild.innerHTML == questions[i-1].answer) {
         cond = 'correct';
         points += 10;
      }
      
      score.innerHTML = points;
      e.target.classList.add(cond);
      setTimeout(function() { //it delays inside it
         e.target.classList.remove(cond);
         progress.style.width = `${((i+1)/maxQuest)*100}%`;
         if(i < maxQuest) {
            createMCQ(questions[i]);
            questNO.innerHTML = `Question ${i+1}/${maxQuest}`;
         } 
         i++;
      }, 800);
   }
   
   let pointsRef = points;
   if(i === maxQuest) {
      window.location.assign('../html/end.html');
      
      if (localStorage.getItem("ldr-board") === null) {
         let obj = new Object();
         obj.score = pointsRef;
         localStorage.setItem('ldr-board', JSON.stringify(obj));
      }
      else {
         const obj = JSON.parse(localStorage.getItem("ldr-board"));
         obj.score = pointsRef;
         localStorage.setItem('ldr-board', JSON.stringify(obj));
      }
   }
}


