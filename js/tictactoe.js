// wrapped in an IIFE so I don't pollute the global namespace
(function () {
  "use strict";

  // These are winning combinations based on the values that I assigned to each board box in the html.
  var winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]
  ];

  // Generate the html for the start screen.
  var $start = $("<div class='screen screen-start' id='start'>" +
    "<header><h1>Tic Tac Toe</h1><a href='#' id='start-btn' class='button'>Play Game</a></header></div>");

  // Generate the html for the screen that is displayed at the end of the game. It displays the outcome.
  var $end = $("<div class='screen screen-win' id='end'>" +
    "<header><h1>Tic Tac Toe</h1><p id='msg'>message</p><a href='#' id='play-again-btn' class='button'>Play Again</a></header></div>");

  // Add the generated html to the body. Show the start screen and hide the board.
  var $body = $("body");
  $body.prepend($start);
  $body.append($end);
  $end.hide();
  var $board = $("#board");
  $board.hide();

  // Get the players so we can easily refer to them. We switch between after each turn.
  var $player1 = $("#player1");
  var $player2 = $("#player2");

  // Initialize variables
  var player1Choices = [];
  var player2Choices = [];
  var message = "";
  var turns = 0;

  // Player 1 takes the first turn, so will be the current player on start up. Add the active class to player 1.
  var currentPlayer = 1;
  $player1.addClass("active");

  /* --------------------------------------------------------------------

   Event Handlers

   -------------------------------------------------------------------- */

  // Event handler for clicking on any of the game board boxes
  $(".boxes").on("click", "li", function () {

    var selection = $(this).attr("data-selection");
    $(this).addClass("disabled");

    var outcome = 0;
    if (currentPlayer === 1) {
      $player1.removeClass("active");
      $player2.addClass("active");

      $(this).addClass("box-filled-1");
      player1Choices.push(parseInt(selection));

      outcome = checkForWinner();
      if (outcome > 0) {
        showGameOverScreen(outcome);
        return;
      }
      currentPlayer = 2;
    } else {

      $player1.addClass("active");
      $player2.removeClass("active");

      $(this).addClass("box-filled-2");
      player2Choices.push(parseInt(selection));
      outcome = checkForWinner();
      if (outcome > 0) {
        showGameOverScreen(outcome);
        return;
      }

      currentPlayer = 1;
    }

  });

  // Event handler for hovering over any of the game board boxes
  $(".boxes li").hover(function () {

    if (currentPlayer === 1) {
      $(this).addClass("player-o-image");
    } else {
      $(this).addClass("player-x-image");
    }

  }, function () {

    if (currentPlayer === 1) {
      $(this).removeClass("player-o-image");

    } else {
      $(this).removeClass("player-x-image");
    }

  });

  // Event handler for the start button on the start screen
  $("#start-btn").click(function () {
    $("#start").hide();
    $("#board").show();
  });

  // Event handler for the play again button on the end screen
  $("#play-again-btn").click(function () {
    $("#end").hide();
    $("#board").show();
  });


  /* --------------------------------------------------------------------

   Game Logic

   -------------------------------------------------------------------- */

  function checkForWinner() {

    // Use the underscore library's intersection function to
    // compare a player's choices to the predefined winning combinations

    for (var i = 0; i < winningCombinations.length; i++) {
      var x = _.intersection(player1Choices, winningCombinations[i]);
      var len = x.length;
      // when len === 3 that means there was match and the player wins
      if (len === 3) {
        return 1;
      }

      x = _.intersection(player2Choices, winningCombinations[i]);
      len = x.length;
      // when len === 3 that means there was match and the player wins
      if (len === 3) {
        return 2;
      }
    }

    // Increment turns. A game consists of at most 9 turns, so if there is no winner after
    // 9 turns, we know it's a tie.
    turns += 1;

    // It's a tie.
    if (turns === 9) {
      return 3;
    }
    // If there is no winner, return 0 so that the game continues.
    return 0;

  }

  function showGameOverScreen(outcome) {

    var outcomeClass;

    // 1. set the message and class to the outcome
    if (outcome === 3) {
      message = "It's a Tie!";
      outcomeClass = "screen-win-tie";
    } else if (outcome === 1) {
      message = "Player 1 Wins!";
      outcomeClass = "screen-win-one";
    } else if (outcome === 2) {
      message = "Player 2 Wins!";
      outcomeClass = "screen-win-two";
    }
    // 1a. log game statistics to console
    writeStatsToConsole();
    // 2. set the class for the end screen
    $end.removeClass();
    $end.attr("class", "screen screen-win " + outcomeClass);
    // 3. add the message to the screen
    $("#msg").text(message);
    // 3. reset the game so you're ready for a new game
    resetGame();
    // 4. show the game end screen
    $end.show();
    // 5. hide board
    $board.hide();
  }

  // utility class to print game information to console
  function writeStatsToConsole() {
    console.log(message);
    console.log("Player 1 ", player1Choices, " Player 2 ", player2Choices);
    console.log("turns = ", turns);
    console.log("The turns will be one less than the actual number of turns in games that don't end in a tie.");
  }

  // put game into the correct state for a new game.
  function resetGame() {
    currentPlayer = 1;
    player1Choices = [];
    player2Choices = [];
    turns = 0;

    var $li = $('ul.boxes li');

    $li.each(function () {
      $li.attr("class", "box");
    });

    $player1.addClass("active");
    $player2.removeClass("active");
  }
}());