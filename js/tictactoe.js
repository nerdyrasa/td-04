var winningCombinations = [
  [1,2,3], [4,5,6], [7,8,9],
  [1,4,7], [2,5,8], [3,6,9],
  [1,5,9], [3,5,7]
];

var currentPlayer = 1;
var player1Choices = [];
var player2Choices = [];

// initially hide the board
var message = "";
var turns = 0;
// show start screen

var $start = $("<div class='screen screen-start' id='start'>" +
  "<header><h1>Tic Tac Toe</h1><a href='#' id='start-btn' class='button'>Play Game</a></header></div>");

// prepend or append: does it matter?

var $end = $("<div class='screen screen-win' id='end'>" +
    "<header><h1>Tic Tac Toe</h1><p id='msg'>message</p><a href='#' id='play-again-btn' class='button'>Play Again</a></header></div>");


var $body = $("body");

$body.prepend($start);
$body.append($end);
$end.hide();
// wire up the event handler for button

$("#start-btn").click(function() {
  $("#start").hide();
  $("#board").show();
});

$("#play-again-btn").click(function(){
  $("#end").hide();
  $("#board").show();
});



var $player1 = $("#player1");
var $player2 = $("#player2");
var $board = $("#board");

$board.hide();


$player1.addClass("active");

 /* --------------------------------------------------------------------

    Event Handlers

 -------------------------------------------------------------------- */

$(".boxes").on("click", "li", function(){

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
    if (outcome > 0 ) {
      showGameOverScreen(outcome);
      return;
    }

    currentPlayer = 1;
  }

});

$(".boxes li").hover(function(){
//  console.log("hover in");

  if (currentPlayer === 1) {
   // console.log("current player is ", currentPlayer);
    $(this).addClass("player-o-image");

  } else
    $(this).addClass("player-x-image");

}, function(){

 // console.log("hover out");
  if (currentPlayer === 1) {
    //console.log("current player is ", currentPlayer);
    $(this).removeClass("player-o-image");

  } else
    $(this).removeClass("player-x-image");

});


/* --------------------------------------------------------------------

    Game Logic

 -------------------------------------------------------------------- */


function checkForWinner(){

  for (var i=0; i < winningCombinations.length ; i++)
  {
    var x =  _.intersection(player1Choices, winningCombinations[i]);
    var len = x.length;

    if (len === 3) {
      return 1;
      //showGameOverScreen(1);
    }

    x =  _.intersection(player2Choices, winningCombinations[i]);
    len = x.length;

    if (len === 3) {
      return 2;
      //showGameOverScreen(2);
     }
  }

  turns += 1;
  console.log("turns = ", turns);

  // It's a tie.
  if (turns === 9)  {
    return 3;
    //showGameOverScreen(0);
  }
  return 0;

}

function showGameOverScreen(outcome) {

  var outcomeClass;

  // 1. set the message to the outcome

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

  // 1a. log message to console
  console.log(message);
  console.log("Player 1 ", player1Choices, " Player 2 ", player2Choices);
  console.log("turns = ", turns);

  // 2. set the screen
  // 3. add the message to the screen
  // 4. show $end
  // 5. hide board

  $end.removeClass();
  $end.attr("class", "screen screen-win " + outcomeClass);
  //$end.addClass(outcomeClass);
  $("#msg").text(message);
  resetGame();
  $end.show();
  $board.hide();
}

function resetGame()
{
  currentPlayer = 1;
  player1Choices = [];
  player2Choices = [];
  turns = 0;

  var $li = $('ul.boxes li');

  $li.each(function () {
    $li.attr( "class", "box" );
  });

  $player1.addClass("active");
  $player2.removeClass("active");
}