
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
var choice = document.getElementsByClassName("choice");
var BchoiceA = document.getElementById("BchoiceA");
var BchoiceB = document.getElementById("BchoiceB");
var BchoiceC = document.getElementById("BchoiceC");
var BchoiceD = document.getElementById("BchoiceD");

choiceA.nodeValue = "A";

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
    i = 0;
    video.style.display = "none";
    intro.style.display = "none";
    quizStart.style.right = "0px";
    if(i == 0){
      populateQuiz(0);
    }
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
      quizStart.style.right = "100vw";
      intro.style.display = "block";
      i = 0;
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
    quizStart.style.right = "100vw";
    intro.style.display = "block";
    i = 0;
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

  //function to show the answer when user clicked the option button
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
        event.target.childNodes[1].style.backgroundColor = 'green';
        event.target.childNodes[3].style.backgroundColor = 'green';
        answerResultDiv.innerText = rightAnswer;

        //setting the previous Btn background after 1 second
        setTimeout(function() {
          event.target.style.backgroundColor = '#434F65';
          event.target.childNodes[1].style.backgroundColor = '#434F65';
          event.target.childNodes[3].style.backgroundColor = '#434F65';
        }, 1000);
        
      } else {
        //if not then change the Btn Background to red
        event.target.style.backgroundColor = 'red';
        event.target.childNodes[1].style.backgroundColor = 'red';
        event.target.childNodes[3].style.backgroundColor = 'red';
        answerResultDiv.innerText = wrongAnswer;

        //setting the previous Btn background after 1 second
        setTimeout(function() {
          event.target.style.backgroundColor = '#434F65';
          event.target.childNodes[1].style.backgroundColor = '#434F65';
          event.target.childNodes[3].style.backgroundColor = '#434F65';
        }, 1000);
      }

      //function call to highlight the correct answer
      highlightCorrectAnswer(ans);

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

  //function to show the answer when user clicked the text of the option
  function optionTextClick(event,CorrectAnsDiv) {
    // This is the correct answer
    ans = CorrectAnsDiv.innerText;

    //not targeting the child elements
    if (event.currentTarget !== event.target) {
      return; 
    }
    
    //if user target option is correct then change the Btn Background to green
    if(event.target.parentNode.value == ans){
      event.target.style.backgroundColor = 'green';
      event.target.parentNode.style.backgroundColor = 'green';
      event.target.previousElementSibling.style.backgroundColor = 'green';
      answerResultDiv.innerText = rightAnswer;

      //setting the previous Btn background after 1 second
      setTimeout(function() {
        event.target.style.backgroundColor = '#434F65';
        event.target.parentNode.style.backgroundColor = '#434F65';
        event.target.previousElementSibling.style.backgroundColor = '#434F65';
      }, 1000);
      
    } else {
      //if not then change the Btn Background to red
      event.target.style.backgroundColor = 'red';
      event.target.parentNode.style.backgroundColor = 'red';
      event.target.previousElementSibling.style.backgroundColor = 'red';
      answerResultDiv.innerText = wrongAnswer;

      //setting the previous Btn background after 1 second
      setTimeout(function() {
        event.target.style.backgroundColor = '#434F65';
        event.target.parentNode.style.backgroundColor = '#434F65';
        event.target.previousElementSibling.style.backgroundColor = '#434F65';
      }, 1000);
    }

    //function call to highlight the correct answer
    highlightCorrectAnswer(ans);

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

  //function to show the answer when user clicked the span (i.e. A), B) ..) of the option
  function spanClick(event,CorrectAnsDiv) {
    // This is the correct answer
    ans = CorrectAnsDiv.innerText;

    //not targeting the child elements
    if (event.currentTarget !== event.target) {
      return; 
    }
    
    //if user target option is correct then change the Btn Background to green
    if(event.target.parentNode.value == ans){
      event.target.style.backgroundColor = 'green';
      event.target.parentNode.style.backgroundColor = 'green';
      event.target.nextElementSibling.style.backgroundColor = 'green';
      answerResultDiv.innerText = rightAnswer;

      //setting the previous Btn background after 1 second
      setTimeout(function() {
        event.target.style.backgroundColor = '#434F65';
        event.target.parentNode.style.backgroundColor = '#434F65';
        event.target.nextElementSibling.style.backgroundColor = '#434F65';
      }, 1000);
      
    } else {
      //if not then change the Btn Background to red
      event.target.style.backgroundColor = 'red';
      event.target.parentNode.style.backgroundColor = 'red';
      event.target.nextElementSibling.style.backgroundColor = 'red';
      answerResultDiv.innerText = wrongAnswer;

      //setting the previous Btn background after 1 second
      setTimeout(function() {
        event.target.style.backgroundColor = '#434F65';
        event.target.parentNode.style.backgroundColor = '#434F65';
        event.target.nextElementSibling.style.backgroundColor = '#434F65';
      }, 1000);
    }

    //function call to highlight the correct answer
    highlightCorrectAnswer(ans);

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

//highlighting the right answer option if user selected the wrong one
function highlightCorrectAnswer(ans){
  if(ans == BchoiceA.value){
    BchoiceA.style.backgroundColor = 'green';
    BchoiceA.childNodes[1].style.backgroundColor = 'green';
    BchoiceA.childNodes[3].style.backgroundColor = 'green';
    setTimeout(function() {
      BchoiceA.style.backgroundColor = '#434F65';
      BchoiceA.childNodes[1].style.backgroundColor = '#434F65';
      BchoiceA.childNodes[3].style.backgroundColor = '#434F65';
    }, 1000);
  }
  if(ans == BchoiceB.value){
    BchoiceB.style.backgroundColor = 'green';
    BchoiceB.childNodes[1].style.backgroundColor = 'green';
    BchoiceB.childNodes[3].style.backgroundColor = 'green';
    setTimeout(function() {
      BchoiceB.style.backgroundColor = '#434F65';
      BchoiceB.childNodes[1].style.backgroundColor = '#434F65';
      BchoiceB.childNodes[3].style.backgroundColor = '#434F65';
    }, 1000);
  }
  if(ans == BchoiceC.value){
    BchoiceC.style.backgroundColor = 'green';
    BchoiceC.childNodes[1].style.backgroundColor = 'green';
    BchoiceC.childNodes[3].style.backgroundColor = 'green';
    setTimeout(function() {
      BchoiceC.style.backgroundColor = '#434F65';
      BchoiceC.childNodes[1].style.backgroundColor = '#434F65';
      BchoiceC.childNodes[3].style.backgroundColor = '#434F65';
    }, 1000);
  }
  if(ans == BchoiceD.value){
    BchoiceD.style.backgroundColor = 'green';
    BchoiceD.childNodes[1].style.backgroundColor = 'green';
    BchoiceD.childNodes[3].style.backgroundColor = 'green';
    setTimeout(function() {
      BchoiceD.style.backgroundColor = '#434F65';
      BchoiceD.childNodes[1].style.backgroundColor = '#434F65';
      BchoiceD.childNodes[3].style.backgroundColor = '#434F65';
    }, 1000);
  }
}




