var questions = [
    {
        no: 1,
        text: "What is html used to",
        choice: ["structure", "style", "logic", "none"],
        answer: 1

    },
    {
        no: 2,
        text: "What element defines the content of a web page?",
        choice: ["<body>", "<head> ", "<title>", "<div>"],
        answer: 1

    },
    {
        no: 3,
        text: "Which attribute is used to link an image to its source file?",
        choice: ["alt", "src", "class", "id"],
        answer: 2

    },
    {
        no: 4,
        text: "Which element defines a list of items with ordered sequence?",
        choice: ["<menu>", "<li>", "<ol>", "<ul>"],
        answer: 3
    },

]

let timerIntervalId;
var currentQueIndex = 0;
var score = 0;
var totalQuestions = questions.length;
var time = 60 ;


const mainBox = document.getElementById("main");

const questionBox = document.getElementById("show-question")
 
const userInput = document.getElementById("answer") ;
const submitButton = document.getElementById("submit-btn");

const nextButton = document.getElementById("next");

// progress bar 
const filledBar = document.getElementsByClassName("filled-bar")[0];
const questionNumber = document.getElementById("question-number");

// ADDING TIMER :
// const timer = document.getElementById("timer");

const timerBox = document.createElement("p");
timerBox.classList.add("timer");

function displayQuestion(){
    
    clearInterval(timerIntervalId);
    const question = questions[currentQueIndex];
    
    // adding timer on display 
    time =60;

    questionBox.innerHTML="";

    timerBox.textContent=time + " SEC";
    questionBox.appendChild(timerBox);
    startTimer(question);
    
    questionNumber.innerText = "Question: " + question.no + "/" + totalQuestions; 
    
    const questionText = document.createElement("p");
    
    questionText.textContent=`Q${question.no}. ${question.text}`;
    
    questionBox.appendChild(questionText);
    
    questionText.classList.add("question");
    

    // APPLY OPTIONS  
    const optionsText = document.createElement("p");
    
    // for(var i = 0 ; i<question1.choice.length ; i++){
        
        //     const span = document.createElement("span");
        
        //     span.innerText = `${i+1}.${question1.choice[i]}`;
        
        //     optionsText.appendChild(span);
        // }
        
        question.choice.forEach((choice1,index) =>{
            const span = document.createElement("span");
            
        span.innerText = `${index+1}.${choice1}`;
        
        optionsText.appendChild(span);
    })
    
    questionBox.appendChild(optionsText);
    optionsText.classList.add("options");
} 

function startTimer(question){
   

    
    timerIntervalId=setInterval(()=>{
        
        console.log(time);
        timerBox.textContent = time + " SEC";
        time--;
        if(time==0 ){
            alert("TIME FOR QUESTION COMPLETED");
            handleNext(question);
           
        }
        
        
    },1000) ; // EXECUTE THIS FOR EVERY 1 SEC 
    
    
}
function handleSubmit (question){
    const userAnswer = parseInt(userInput.value);

    if(isNaN(userAnswer)){
        alert("Please Enter a valid nmumber");
    }
    else if(userAnswer == question.answer){
        alert("YOU ENTERED THE CORRECT ANSWER");
      score++;
    
      handleNext(question);
    }
    else {
        alert("Entered wrong ans");
    }
    userInput.value="";
}

function handleNext(question){
    // update progress bar 
    var barWidth = ((question.no)/totalQuestions)*100;
    filledBar.style.width= barWidth + "%"; 
    // questionNumber.innerText = "Question: " + question.no + "/" + totalQuestions; 

    
    currentQueIndex++;
    if(currentQueIndex < questions.length){
        
          displayQuestion();
    }
    else{
    clearInterval(timerIntervalId);
       
        questionBox.innerHTML="thank you";
        questionBox.style.fontSize="2rem";
        questionBox.style.textAlign="center";
        questionBox.style.margin="20px";


        alert("Quiz Completed : Your Score : " + score + "/" + questions.length);
    }
}

// IMP : IF WE WANT TO GIVE ARGUMENTS WE NEED TO HAVE COMPLEX FUNCTION 
submitButton.addEventListener("click" , function() {
    handleSubmit(questions[currentQueIndex]) ;
});
nextButton.addEventListener("click" , function(){
    handleNext(questions[currentQueIndex]) ;

});

displayQuestion();

