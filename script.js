let questions = [];

let score = 0;
let wrong = 0;
let answered = 0;

const quiz = document.getElementById("quiz");

function loadExam(exam){

if(exam === "A"){
questions = examA;
}

if(exam === "B"){
questions = examB;
}

if(exam === "C"){
questions = examC;
}

restartExam();

}

function loadQuestions(){

quiz.innerHTML = "";

questions.forEach((q,index)=>{

const div = document.createElement("div");

div.classList.add("question");

let html = `<h3>${index+1}. ${q.question}</h3>`;

q.options.forEach((option,i)=>{

html += `
<div class="option" onclick="selectOption(this,${index},${i})">
${option}
</div>
`;

});

div.innerHTML = html;

quiz.appendChild(div);

});

}

function selectOption(element,qIndex,optionIndex){

const questionDiv = element.parentElement;

if(questionDiv.classList.contains("answered")) return;

questionDiv.classList.add("answered");

const options = questionDiv.querySelectorAll(".option");

options.forEach((opt,i)=>{

if(i === questions[qIndex].answer){
opt.classList.add("correct");
}

if(i === optionIndex && i !== questions[qIndex].answer){
opt.classList.add("incorrect");
}

});

if(optionIndex === questions[qIndex].answer){

score++;
document.getElementById("correct").innerText = score;

}else{

wrong++;
document.getElementById("wrong").innerText = wrong;

}

answered++;

document.getElementById("answered").innerText = answered;

}

function finishExam(){

let nota = (score/questions.length)*10;

document.getElementById("result").innerHTML =

`
🏆 RESULTADO FINAL<br><br>

✅ Correctas: ${score}<br>
❌ Incorrectas: ${wrong}<br>
📋 Respondidas: ${answered}<br><br>

📊 Nota Final: ${nota.toFixed(2)}/10
`;

}

function restartExam(){

score = 0;
wrong = 0;
answered = 0;

document.getElementById("answered").innerText = 0;
document.getElementById("correct").innerText = 0;
document.getElementById("wrong").innerText = 0;

document.getElementById("result").innerHTML = "";

loadQuestions();

}

let time = 3600;

const timer = setInterval(()=>{

let minutes = Math.floor(time / 60);
let seconds = time % 60;

seconds = seconds < 10 ? "0"+seconds : seconds;

document.getElementById("timer").innerText =
`${minutes}:${seconds}`;

time--;

if(time < 0){

clearInterval(timer);

finishExam();

}

},1000);

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark-mode");

});

loadExam("A");