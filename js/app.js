let startBtn = document.querySelector(".start");
let lev = document.querySelector(".level");
let sec = document.querySelector(".sec");
let input = document.querySelector("input");
let wordsShow = document.querySelector(".comming-words");
let timeLeft = document.querySelector(".time");
let realScore = document.querySelector(".real-score");
let wordToType = document.querySelector(".words");
let score = document.querySelector(".score");
// array of words

let arrOfWords = [
  "Sunshine",
  "Bicycle",
  "Chocolate",
  "Adventure",
  "Elephant",
  "apple",
  "happy",
  "ocean",
  "dreams",
  "zebra",
  "eleven",
  "computer",
  "beautiful",
  "wonderful",
  "expensive",
  "programming",
  "chocolate",
  "celebration",
  "intelligence",
  "basketball",
  "communication",
  "unbelievable",
  "organization",
  "transportation",
  "understanding",
  "cat",
  "dog",
  "bird",
  "sun",
  "moon",
  "fish",
  "tree",
  "book",
  "rose",
  "star",
  "Accomplishment",
  "Unquestionable",
  "Responsibility",
  "Environmentally",
  "Disproportionate",
];
console.log(arrOfWords[0].length);
let easyArr = [];
let mediumArr = [];
let hardArr = [];

for (let i = 0; i < arrOfWords.length; i++) {
  if (arrOfWords[i].length <= 5) {
    easyArr.push(arrOfWords[i]);
  } else if (arrOfWords[i].length >= 5 && arrOfWords[i].length <= 10) {
    mediumArr.push(arrOfWords[i]);
  } else {
    hardArr.push(arrOfWords[i]);
  }
}

const levels = {
  easy: {
    time: 3,
    arr: easyArr,
  },
  medium: {
    time: 3,
    arr: mediumArr,
  },

  hard: {
    time: 3,
    arr: hardArr,
  },
};

console.log(levels);

let choose = document.querySelectorAll(".choose div");
let chooseArr = Array.from(choose);
let level = "medium";
let levelSecond = levels[level].time;
lev.innerHTML = level;
sec.innerHTML = levelSecond;
timeLeft.innerHTML = levelSecond;
if (window.localStorage.getItem("level")) {
  level = JSON.parse(window.localStorage.getItem("level"));
  levelSecond = levels[level].time;
  lev.innerHTML = level;
  sec.innerHTML = levelSecond;
  timeLeft.innerHTML = levelSecond;
}

arrOfWords = easyArr;
console.log(arrOfWords);

chooseArr.forEach((e) => {
  e.addEventListener("click", function () {
    level = this.className;
    levelSecond = levels[level].time;
    lev.innerHTML = level;
    sec.innerHTML = levelSecond;
    timeLeft.innerHTML = levelSecond;
    window.localStorage.setItem("level", JSON.stringify(level));
    location.reload();
  });
});

score.innerHTML = levels[level].arr.length;

let intervalId;
startBtn.addEventListener("click", function () {
  this.remove();
  input.focus();
  generateWrod();
  showCommingWord();

  intervalId = startTime();
});

function generateWrod() {
  let rand = Math.floor(Math.random() * levels[level].arr.length);
  wordToType.innerHTML = levels[level].arr[rand];
  levels[level].arr.splice(rand, 1);
}
function showCommingWord() {
  wordsShow.innerHTML = "";
  for (let i = 0; i < levels[level].arr.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = levels[level].arr[i];
    wordsShow.appendChild(div);
  }
}

function startTime() {
  return setInterval(() => {
    timeLeft.innerHTML--;
    if (input.value.toLowerCase() == wordToType.innerHTML.toLowerCase()) {
      realScore.innerHTML++;
      input.value = "";
      timeLeft.innerHTML = levelSecond;
      if (arrOfWords.length > 0) {
        generateWrod();
        showCommingWord();
      } else {
        wordToType.innerHTML = "You Win";
        wordToType.classList.add("good");
        clearInterval(intervalId);
      }
    }
    if (timeLeft.innerHTML === "0") {
      clearInterval(intervalId);
      wordToType.innerHTML = "You Lose";
      wordToType.classList.add("bad");
      wordsShow.innerHTML = "";
      setTimeout(() => {
        location.reload();
      }, 1300);
    }
  }, 1000);
}

// lev.innerHTML = defaultLevel;
// sec.innerHTML = defaultLevelSecond;
// timeLeft.innerHTML = defaultLevelSecond;
// score.innerHTML = arrOfWords.length;

// startBtn.addEventListener("click",()=>{
//     startBtn.style.display = "none";
//     input.focus();
//     genrateWord ()
//     showWord();
//     StartPlay();

// })
// function genrateWord (){
//     let generate = Math.floor(Math.random()*arrOfWords.length)
//     wordToType.innerHTML = arrOfWords[generate];
//     arrOfWords.splice(generate,1);
//     wordsShow.innerHTML = "";
// }

// function showWord (){
//     wordsShow.innerHTML = "";
//     for(let i =0;i<arrOfWords.length;i++){
//         let div = document.createElement("div");
//         div.innerHTML = arrOfWords[i];
//         wordsShow.appendChild(div);
//     }
// }

// function StartPlay (){
//     let counter = setInterval(()=>{
//         timeLeft.innerHTML--;
//         if(timeLeft.innerHTML==="0"){
//             clearInterval(counter);
//             if(wordToType.innerHTML.toLocaleLowerCase() == input.value.toLocaleLowerCase()){
//                 realScore.innerHTML++;
//                 input.value = "";
//                 if(arrOfWords.length > 0){
//                     genrateWord ()
//                     showWord ()
//                     timeLeft.innerHTML = defaultLevelSecond;

//                 }

//             }else{

//             }
//         }
//     },1000)
// }
