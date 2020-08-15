$(document).ready(function() {

    let startButton = $(".start-button");
    let questionEl = $("#question-container");
    let showQuestionsElement = $("#question");
    let answerButtons = $("#answer-buttons");
    let answerButton1 = $("#button1");
    let answerButton2 = $("#button2");
    let answerButton3 = $("#button3");
    let answerButton4 = $("#button4");
    let timerEl = $(".timer");


    let initials = "";
    let timer = 60;
    let highScore = "";
    let timeInterval;
    let questionIndex = 0;

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


    function start() {
        startButton.addClass("hide");
        questionEl.removeClass("hide");
        setNextQuestion();
        startTimer();


    }



    function setNextQuestion() {
        $("#answer-buttons").empty();




        showQuestionsElement.text(questions[questionIndex].question);
        for (var i = 0; i < questions[questionIndex].choices.length; i++) {
            let $randomButton = $("<button>");
            $randomButton.text(questions[questionIndex].choices[i]);
            $randomButton.on("click", function() {
                questionIndex++;
                if (questionIndex < questions.length) {
                    setNextQuestion();
                } else {
                    console.log("game over");
                    $("#question-container").empty();
                    clearInterval(timeInterval);
                }

                console.log(event);

            })

            $("#answer-buttons").append($randomButton);

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

    function checkAnswer() {

    }












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