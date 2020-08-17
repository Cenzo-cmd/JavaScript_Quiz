$(document).ready(function() {

    let startButton = $(".start-button");
    let questionEl = $("#question-container");
    let showQuestionsElement = $("#question");
    let timerEl = $(".timer");
    let scoresHere = $(".listScores");
    let pEl = $(".pClass");
    let endButtons = $(".endingButtons");

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
                alert("Correct!  You get 5 points.");
                currentScore += 5;

            } else {
                alert("Wrong!  You will lose 10 seconds off the timer");
                timer -= 10;
                console.log(currentScore);
            }
        }
    }

    function startTimer() {
        initials = prompt("Please enter your name for high score");
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
        currentScore = timer + currentScore;
        let highScores = loadHighScores();
        if (highScores) {

            highScores.push({ name: initials, score: currentScore });
            highScores.sort((a, b) => (a.score > b.score) ? -1 : 1);
            if (highScores.length > 5) {
                highScores.pop();

            }
        } else {
            highScores = [{ name: initials, score: currentScore }];
        }

        createHighScoreTable(highScores);
        saveHighScore(highScores);
        clearInterval(timeInterval);
    }

    function loadHighScores() {
        let highScores = JSON.parse(localStorage.getItem("highScores"));
        return highScores;
    }

    function saveHighScore(highScores) {
        localStorage.setItem("highScores", JSON.stringify(highScores));
    }

    function createHighScoreTable(highScores) {
        for (var i = 0; i < highScores.length; i++) {
            pEl.text("Top 5 High Scores");
            let newScoreItem = $("<li></li><br>");
            newScoreItem.text("Name: " + highScores[i].name + "      Score: " + "  " + highScores[i].score);
            scoresHere.append(newScoreItem);
        }
        endGameButtons();
    }

    function endGameButtons() {
        let restartButton = $("<button>");
        let clearHighScore = $("<button>");
        restartButton.text("Restart");
        clearHighScore.text("Clear high scores");
        restartButton.addClass("buttons");
        clearHighScore.addClass("buttons");
        endButtons.append(restartButton);
        endButtons.append(clearHighScore);

        clearHighScore.on("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            localStorage.clear();
            scoresHere.empty();
        })

        restartButton.on("click", function(event) {
            event.preventDefault();
            event.stopPropagation();
            location.reload();
        })
    }
})