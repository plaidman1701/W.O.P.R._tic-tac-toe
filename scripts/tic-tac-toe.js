/*
	W.O.P.R. tic-tac-toe
	tic-tac-toe.js
*/

var $playingSquares = $('.square');
var btnlets_play = document.getElementById('lets_play');
var btnAgain = document.getElementById('btn_01');
var btnQuit = document.getElementById('btn_02');
var xTurn = true;
var gameOver = false;
var numberOfTurns = 0;

$('#continue').hide();

$playingSquares.click(claimSquare);

btnlets_play.onclick = gamestart;
btnAgain.onclick = gameReset;
btnQuit.onclick = quitGame;

function gamestart() {
	$('#greeting').hide();
	$('#maingame').show();
}

function gameReset() {
	$('#continue').hide();
	xTurn = true;
	gameOver = false;
	numberOfTurns = 0;
	$playingSquares.css('background-image', 'none');
	$playingSquares.css('background-color', 'black');
	$('#gamestatus').html('<p>X to move.</p>');
}

function quitGame() {
	$('#maingame').hide();
	$('#farewell').show();
}

function claimSquare() {

	if (!gameOver)
	{
		var $this = $(this);

		// Check if square is occupied, and exit if so
		var bgimg = $this.css('background-image');
		if (bgimg != 'none')
		{
			return 1;
		}

		// claim square for player
		if (xTurn)
		{
			$this.css('background-image', 'url(img/x.png)');
		}
		else
		{
			$this.css('background-image', 'url(img/o.png)');
		}

		// end of turn, do paperwork
		numberOfTurns++;

		var winString;
		winString = (xTurn ? "X" : "O");

		if (checkWinner()) // check for a winner
		{		
			$('#gamestatus').html('<p>' + winString + ' wins.</p>');
			gameOver=true;
		}
		else if (numberOfTurns >= 9) // check for a draw
		{
			$('#gamestatus').html('<p>Draw.</p>');
			gameOver=true;
		}
		else
		{ // game continues with next player
			xTurn = !xTurn;
			winString = (xTurn ? "X" : "O");

			$('#gamestatus').html('<p>' + winString + ' to move.</p>');
		}

		if (gameOver) // show game over options
		{
			$('#continue').toggle();			
		}
	}

}

function checkWinner() {

	//alert('checkwinner fired');

	const possibleWins = ['top', 'middle', 'bottom', 'left', 'centre', 'right'];
	var topLeft, bottomLeft, middleCentre, topRight, bottomRight; // to temporarily store background URLs
	var i;
	var xDetected;
	var oDetected;
	for (i in possibleWins) // normally this should be an i;i<;i++ loop, but it's run on a const array
	{
		var positionToGet = possibleWins[i]; // get the row name (top, middle etc)

		var checkForWin = document.getElementsByClassName(positionToGet); // get the squares in that row

		var firstSquare = checkForWin[0].style.backgroundImage;
		var secondSquare = checkForWin[1].style.backgroundImage;
		var thirdSquare = checkForWin[2].style.backgroundImage;

		xDetected = false;
		oDetected = false;
		if (firstSquare.indexOf('x.png') > 0)
		{
			xDetected = true;
		}
		else if (firstSquare.indexOf('o.png') > 0)
		{
			oDetected = true;
		}

		if ((xDetected || oDetected) && // check if first element has an X or O
			(firstSquare == secondSquare) && // and it matches the second element
			(secondSquare == thirdSquare)) // and it matches the third element
		{
			return true;
		}

		// store for diagonals check later
		if (positionToGet == 'top')
		{
			topLeft = firstSquare;
			topRight = thirdSquare;
		}
		else if (positionToGet == 'middle')
		{
			middleCentre = secondSquare;
		}
		else if (positionToGet == 'bottom')
		{
			bottomLeft = firstSquare;
			bottomRight = thirdSquare;
		}
	}

	// check diagnonals
	xDetected = false;
	oDetected = false;
	if (middleCentre.indexOf('x.png') > 0) // check if middle is an X or O
	{
		xDetected = true;
	}
	else if (middleCentre.indexOf('o.png') > 0)
	{
		oDetected = true;
	}

	if (xDetected || oDetected)
	{
		if (((topLeft == middleCentre) && (middleCentre == bottomRight)) || ((topRight == middleCentre) && (middleCentre == bottomLeft)))
		{
			return true;
		}
	}
	return false;
}