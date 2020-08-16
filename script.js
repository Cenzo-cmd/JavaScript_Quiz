$(document).ready(function() {

    let startButton = $(".start-button");
    let questionEl = $("#question-container");
    let showQuestionsElement = $("#question");
    let answerButtons = $("#answer-buttons");
    let timerEl = $(".timer");


    let initials = "";
    let timer = 60;
    let highScore = 0;
    let timeInterval;
    let currentScore = 0;



    let questions = [{
        question: "What is one + 1",
        choices: ["2", "6", "4", "5"],
        correctAnswer: "2"
    }, {
        question: "what is 2+2",
        choices: ["2", "6", "4", "5"],
        correctAnswer: "4",

    }, {
        question: "what is 4 + 2",
        choices: ["2", "6", "4", "5"],
        correctAnswer: "6",
    }, {
        question: "what is 6 + 2",
        choices: ["2", "8", "4", "5"],
        correctAnswer: "8",
    }, {
        question: "what is 3 + 3 ",
        choices: ["2", "6", "4", "5"],
        correctAnswer: "6",
    }]

    startButton.on("click", start);


    function start(event) {
        event.preventDefault();
        event.stopPropagation();
        startButton.addClass("hide");
        questionEl.removeClass("hide");
        setNextQuestion(0);
        startTimer();
        currentScore = 0;




    }



    function setNextQuestion(questionNum) {
        $("#answer-buttons").empty();


        for (var i = 0; i < questions[questionNum].choices.length; i++) {
            showQuestionsElement.text(questions[questionNum].question);
            let $randomButton = $("<button>");
            $randomButton.text(questions[questionNum].choices[i]);
            $randomButton.addClass("buttons");

            $randomButton.on("click", function(event) {
                event.preventDefault();
                event.stopPropagation();

                if (questionNum < questions.length - 1) {
                    checkAnswer(questionNum);
                    setNextQuestion(questionNum + 1);



                } else {
                    $("#question-container").empty();
                    clearInterval(timeInterval);

                }
            })

            $("#answer-buttons").append($randomButton);

        }

        function checkAnswer(questionNum) {
            if (event.target.innerText === questions[questionNum].correctAnswer) {
                alert("good job");
                currentScore++;
            } else {
                timer -= 10;

            }

            console.log(event.target.innerText);
            console.log("this is the answer " + questions[questionNum].correctAnswer);

        }

    }

    function startTimer() {
        initials = prompt("Please enter you initials for high score");
        timeInterval = setInterval(function() {
            if (timer <= -1) {
                timerEl.text("You are out of time!");
                clearInterval(timer);
                questionEl.addClass("hide");

            } else {
                timer--;
                timerEl.text("You have " + timer + " seconds left");

            }
        }, 1000)

    }

    function gameOver() {
        //display the current score
        //compare current score to high score
        //update high score if needed


    };













})

// function setNextQuestion() {
// for (var i = 0; i < questions.length; i++) {
// console.log("this is the length of array" + questions.length)
// }
// showQuestionsElement.text(questions[0].question);
// answerButton1.text(questions[0].choice1);
// answerButton2.text(questions[0].choice2);
// answerButton3.text(questions[0].choice3);
// answerButton4.text(questions[0].choice4);

// console.log(showQuestionsElement);
// }