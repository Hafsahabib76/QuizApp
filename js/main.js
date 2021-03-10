
//divs, video and buttons
var video = document.getElementById("logoVideo");
var intro = document.getElementById("introductionDiv");
var quizStart = document.getElementById("quizStartDiv");
var answerDiv = document.getElementById("answerDiv");
var countdown = document.getElementById("countdown");
var nextQueButton = document.getElementById("nextQueButton");

//quiz
var question = document.getElementById("question");
var choiceA = document.getElementById("choiceA");
var choiceB = document.getElementById("choiceB");
var choiceC = document.getElementById("choiceC");
var choiceD = document.getElementById("choiceD");
var CorrectAnsDiv = document.getElementById("CorrectAnsDiv");
var answerResultDiv = document.getElementById("answerResultDiv");
var answerDetailDiv = document.getElementById("answerDetailDiv");

//quiz options button
var BchoiceA = document.getElementById("BchoiceA");
var BchoiceB = document.getElementById("BchoiceB");
var BchoiceC = document.getElementById("BchoiceC");
var BchoiceD = document.getElementById("BchoiceD");

//Declaring some variables
var correctAnswer; 
var i = 0; //used for loop and conditions
var ansDescription;

//when user click play now button to start the video
function playVid() { 
    video.style.display = "block";
    video.play(); 
} 

//show quiz div when video ended and hide video and intro div
video.onended = function() {
    video.style.display = "none";
    intro.style.display = "none";
    quizStart.style.right = "0px";
  };

//variable declaration and intilization for countdown Timer from 0 to 10 seconds
var timeout, interval
var threshold = 11000;
var secondsleft = threshold;

//checking function if (seconds left == 0) show the next question
function startChecking() {
	secondsleft -= 1000;
	countdown.innerHTML = Math.abs((secondsleft / 1000));
	if (secondsleft == 0) {
    //hide answer div when time is up
		answerDiv.style.right = "100vw";

    //if last question show the intro div and hide the quiz div
    if(i == quizzes.length - 1){
      quizStart.style.display = "none";
      intro.style.display = "block";
    }else{
      //move to next question
      i = i + 1;
      populateQuiz(i);
    }
	}
}

//function to start the countdown timer 
function startschedule() {
	clearInterval(interval);
	secondsleft = threshold;
	countdown.innerHTML = Math.abs((secondsleft / 1000));
	interval = setInterval(function() {
		startChecking();
	}, 1000)
}

//function to reset the timer
function resetTimer() {
	startschedule();
}

//function when next question button click
nextQueButton.onclick = function() {
  //hide the answer div
  answerDiv.style.right = "100vw";

  //if last question show the intro div and hide the quiz div
  if(i == quizzes.length - 1){
    quizStart.style.display = "none";
    intro.style.display = "block";
  }else{
    //move to next question
    i = i + 1;
    populateQuiz(i);
  }
  
};

//function to populate the details of the quiz question
function populateQuiz(qNum) {
  var individualQuestion = quizzes[i];
  
  question.innerText = individualQuestion.question;
  choiceA.innerText = individualQuestion.choiceA;
  choiceB.innerText = individualQuestion.choiceB;
  choiceC.innerText = individualQuestion.choiceC;
  choiceD.innerText = individualQuestion.choiceD;
  CorrectAnsDiv.innerText  = individualQuestion.correct;
  ansDescription = individualQuestion.didYouKnow;

}

//if first time quiz appears then show the first question
if( i == 0) {
  populateQuiz(0);

  //function to show the answer when user clicked the option
  function ShowAnswerDiv(event,CorrectAnsDiv) {

      // This is the correct answer
      ans = CorrectAnsDiv.innerText;

      //not targeting the child elements
      if (event.currentTarget !== event.target) {
        return; 
      }
      
      //if user target option is correct then change the Btn Background to green
      if(event.target.value == ans){
        event.target.style.backgroundColor = 'green';
        answerResultDiv.innerText = rightAnswer;

        //setting the previous Btn background after 1 second
        setTimeout(function() {
          event.target.style.backgroundColor = '#434F65';
        }, 1000);
        
      } else {
        //if not then change the Btn Background to red
        event.target.style.backgroundColor = 'red';
        answerResultDiv.innerText = wrongAnswer;

        //setting the previous Btn background after 1 second
        setTimeout(function() {
          event.target.style.backgroundColor = '#434F65';
        }, 1000);
      }

      //highlighting the right answer option if user selected the wrong one
      if(ans == BchoiceA.value){
        BchoiceA.style.backgroundColor = 'green';
        setTimeout(function() {
          BchoiceA.style.backgroundColor = '#434F65';
        }, 1000);
      }
      if(ans == BchoiceB.value){
        BchoiceB.style.backgroundColor = 'green';
        setTimeout(function() {
          BchoiceB.style.backgroundColor = '#434F65';
        }, 1000);
      }
      if(ans == BchoiceC.value){
        BchoiceC.style.backgroundColor = 'green';
        setTimeout(function() {
          BchoiceC.style.backgroundColor = '#434F65';
        }, 1000);
      }
      if(ans == BchoiceD.value){
        BchoiceD.style.backgroundColor = 'green';
        setTimeout(function() {
          BchoiceD.style.backgroundColor = '#434F65';
        }, 1000);
      }

      //appears answer div
      answerDiv.style.right = "0px";

      //displaying text in answer detail div
      answerDetailDiv.innerText = ansDescription;

      //if quiz questions reach to the end then display play again button text
      if(i == quizzes.length - 1){
        nextQueButton.innerText = playAgainButton;
      }else{
        //display next question button text
        nextQueButton.innerText = skipButtonText;
      }

      //calling startschedule() function to start timer of 10 seconds when answer screen appears
      startschedule();
      
  }
}




