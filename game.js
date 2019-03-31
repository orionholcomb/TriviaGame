$(document).ready(function() {
  $("#start").on("click", trivia.startTrivia);
  $(".option").on("click", trivia.checkAnswer);
});
// q = question // Creating the object so I don't have to create variables for everything
var trivia = {
  correct: 0,
  incorrect: 0,
  blank: 0,
  qNumber: 0,
  time: 15,
  timeOn: false,
  timeID: "",
  questions: {
    q1: "What is the leading software for purchasing games on the computer?",
    q2: "What is currently the most played video game in the world?",
    q3:
      "Which console allows you to take it apart and play with friends using the parts?",
    q4: "What was the first official video game to be released?",
    q5: "Which company released the Playstation?",
    q6: "Which of the following has sold more units?",
    q7: "What is the name of the original developer who created Minecraft?",
    q8:
      "In Blizzard's title Overwatch, what is the name of the girl on the cover?",
    q9:
      "In which game are you tasked with assassinating corrupt/evil people of power around the world?",
    q10:
      "(Hard Question) In which of the following titles can you find the Crystal Sage?"
  },
  // a = answer & c = choices
  choices: {
    c1: ["Valve", "Origin", "Steam", "Razer"],
    c2: ["Counter Strike", "Fortnite", "League of Legends", "Apex Legends"],
    c3: ["Switch", "Xbox", "Playstation", "Gamecube"],
    c4: ["Tetris", "Pong", "Virtual Tic-Tac-Toe", "Pac-Man"],
    c5: ["Microsoft", "Nintendo", "Apple", "Sony"],
    c6: ["Xbox 360", "Playstation 3", "Wii U", "3DS"],
    c7: ["Cpt Sparklez", "Jeb", "Notch", "Gaben"],
    c8: ["Lucy", "Tracy", "Roxie", "Tracer"],
    c9: ["Hunted", "Cold Blood", "Hitman", "Deadbeat"],
    c10: ["Dark Souls", "Final Fantasy", "Warcraft", "Starcraft"]
  },
  answers: {
    a1: "Steam",
    a2: "League of Legends",
    a3: "Switch",
    a4: "Pong",
    a5: "Sony",
    a6: "Xbox 360",
    a7: "Notch",
    a8: "Tracer",
    a9: "Hitman",
    a10: "Dark Souls"
  }
};

// Function that starts the trivia
function startTrivia() {
  trivia.qNumber = 0;
  trivia.correct = 0;
  trivia.incorrect = 0;
  trivia.blank = 0;
  clearInterval(trivia.timeID);

  $("#triviaBase").show();
  $("#results").html("");
  $("#start").hide();
  $("#timeLeft").text("Time left: " + trivia.time);
  $("#timeLeft").show();

  trivia.nextQ();
}

// Function to move on to the next question
function nextQ() {
  trivia.time = 15;
  $("#timeLeft").text("Time left: " + trivia.time);

  if (!trivia.timeOn) {
    trivia.timeId = setInterval(trivia.timerSet, 1000);
  }

  var mainQuestion = Object.values(trivia.questions)[trivia.qNumber];
  $("#question").text(mainQuestion);

  var mainOptions = Object.values(trivia.choices)[trivia.qNumber];

  $.each(mainOptions, function(index, key) {
    $("#answers").append(
      $('<button class="option btn btn-info btn-lg">' + key + "</button>")
    );
  });
}

function timerSet() {
  if (
    trivia.time > -1 &&
    trivia.qNumber < Object.keys(trivia.questions).length
  ) {
    $("#timeLeft").text("Time left: " + trivia.time);
    trivia.time--;
  }

  if (trivia.time === -1) {
    trivia.blank++;
    clearInterval(trivia.timeId);
    resultId = setTimeout(trivia.guessResult, 1000);
    $("#results").html(
      "<h3>Out of time. Answer: " +
        Object.values(trivia.answers)[trivia.qNumber] +
        "</h3>"
    );
  } else if (trivia.qNumber === Object.keys(trivia.questions).length) {
    // adds results of game to the bottom of the page
    $("#results").html(
      "<h3>Take a look at your results:</h3>" +
        "<p>Correct: " +
        trivia.correct +
        "</p>" +
        "<p>Incorrect: " +
        trivia.incorrect +
        "</p>" +
        "<p>Unaswered: " +
        trivia.blank +
        "</p>"
    );

    $("#triviaBase").hide();
    $("#start").show();
  }
}

// see if the user's chosen answer is correct
function checkAnswer() {
  var resultId;

  var correctAnswer = Object.values(trivia.answers)[trivia.qNumber];

  if ($(this).text() === correctAnswer) {
    $(this)
      .addClass("btn-success")
      .removeClass("btn-info");

    trivia.correct++;
    clearInterval(trivia.timeId);
    resultId = setTimeout(trivia.resultRem, 1000);
    $("#results").html("<h3>Correct!</h3>");
  } else {
    $(this)
      .addClass("btn-danger")
      .removeClass("btn-info");

    trivia.incorrect++;
    clearInterval(trivia.timeId);
    resultId = setTimeout(trivia.resultRem, 1000);
    $("#results").html("<h3>Better luck next time! " + correctAnswer + "</h3>");
  }
}
//remove question results and options to make room for the next
function resultRem() {
  trivia.qNumber++;

  $(".option").remove();
  $("#results h3").remove();
  trivia.nextQuestion();
}
