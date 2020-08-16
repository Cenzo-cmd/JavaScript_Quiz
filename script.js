$(document).ready(function() {

    let startButton = $(".start-button");
    let questionEl = $("#question-container");
    let showQuestionsElement = $("#question");
    let answerButtons = $("#answer-buttons");
    let timerEl = $(".timer");


    let initials = "";
    let timer = 60;
    let timeInterval;
    let currentScore = 0;



    let questions = [{
        question: "Which tag inserts Javascript into the HTML page",
        choices: ["<script>", "<javascript>", "<body>", "<head>"],
        correctAnswer: "<script>"
    }, {
        question: "How do you say Hello World in an alert box",
        choices: ["show('Hello World');", "push('Hello World');", "alert('Hello World');", "msg('Hello World');"],
        correctAnswer: "alert('Hello World');",

    }, {
        question: "Which of the following is NOT a Javascript data type",
        choices: ["null", "boolean", "undefined", "element"],
        correctAnswer: "element",
    }, {
        question: "Which function removes an item from an array",
        choices: [".push()", ".remove()", ".pop()", ".slice()"],
        correctAnswer: ".pop()",
    }, {
        question: "Which variable can NOT be changed or altered",
        choices: ["var", "const", "let", "if"],
        correctAnswer: "const",
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
                    checkAnswer(questionNum);
                    $("#question-container").empty();
                    gameOver();

                }
            })

            $("#answer-buttons").append($randomButton);

        }

        function checkAnswer(questionNum) {
            if (event.target.innerText === questions[questionNum].correctAnswer) {
                alert("good job");
                currentScore += 5;
                console.log(currentScore);
            } else {
                timer -= 10;
                console.log(currentScore);

            }
        }
    }

    function startTimer() {
        initials = prompt("Please enter you initials for high score");
        timeInterval = setInterval(function() {
            if (timer <= -1) {
                timerEl.text("You are out of time!");
                questionEl.addClass("hide");
                gameOver();


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
        currentScore = timer + currentScore;

        let highScores = loadHighScores();

        if (highScores) {
            highScores.sort((a, b) => (a.score > b.score) ? -1 : 1);
            highScores.push([{ name: initials, score: currentScore }]);

            if (highScores.length > 5) {
                highScores.pop();


            }
        } else {
            highScores = [{ name: initials, score: currentScore }];
            console.log("this is running");
        }
        saveHighScore(highScores);
        clearInterval(timeInterval);




    }

    function saveHighScore(highScores) {
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    function loadHighScores() {

        let highScores = JSON.parse(localStorage.getItem("highScores"));
        return highScores;

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