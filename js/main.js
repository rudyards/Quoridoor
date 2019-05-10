/*----- constants -----*/ 
const PLAYER = {
  '1': 'lime',
  '-1': 'purple',
  'null': 'white',
  'w': 'black'
}

/*----- app's state (variables) -----*/
var board, winner, turn;

/*----- cached element references -----*/ 
const msgEl = document.getElementById('msg');
const remindEl = document.getElementById('reminder');
const boardEl = document.querySelectorAll('td');

/*----- event listeners -----*/ 
document.querySelector('table').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', initialize);

/*----- functions -----*/
initialize();

function handleClick(evt){
    var location = evt.target.id.split('r');
    var col = parseInt(location[0].replace('c', ''));
    var row = parseInt(location[1]);
    if (col % 2 === 1 || row % 2 === 1) {
        placeWall(evt.target);
    } else {
        movePlayer(evt.target);
    }
    render();
}

function movePlayer(target){
    var location = target.id.split('r');
    var row = parseInt(location[1]);
    var col = parseInt(location[0].replace('c', ''));
    // After we have the precise location of the target, such that we could look at the board and find it, now we
    // make sure that the location is next ot the player.

    // Since I can't think of an elegant way, I'm going to brute force this. Revisit later.
    if (board[row][col] != null){
        remindEl.textContent = "That square is currently occupied, you can't move there.";
    }
    else if (board[row+2][col] === turn && board[row+1][col] === null){
        board[row+2][col] = null;
        board[row][col] = turn;
        turn *= -1;
        remindEl.textContent = "";
    } else if (board[row-2][col] === turn && board[row-1][col] === null){
        board[row-2][col] = null;
        board[row][col] = turn;
        turn *= -1;
        remindEl.textContent = "";
    } else if (board[row][col+2] === turn && board[row][col+1] === null){
        board[row][col+2] = null;
        board[row][col] = turn;
        turn *= -1;
        remindEl.textContent = "";
    } else if (board[row][col-2] === turn && board[row][col-1] === null){
        board[row][col-2] = null;
        board[row][col] = turn;
        turn *= -1;
        remindEl.textContent = "";
    } else {
        remindEl.textContent = "You can't move there.";
    }
}

function placeWall(target){
    var location = target.id.split('r');
    var row = parseInt(location[1]);
    var col = parseInt(location[0].replace('c', ''));
    if (board[row][col] != null){
        remindEl.textContent = "There is already a wall there.";
    } else{
        board[row][col] = "w";
        turn *= -1;
        remindEl.textContent = "";
    }
}

function checkWinner(){
    for (i = 0; i < 13; i++){
        if (board[i][0] === -1){
            winner = -1;
        } else if (board[i][12] === 1){
            winner = 1;
        }
    }
}

function render(){
    boardEl.forEach(function(square, indx){
        var target = boardEl[indx].id;
        target = target.split('r');
        var row = target[1];
        var col = target[0].replace('c', '');
        var color = board[row][col]
        boardEl[indx].style.background = PLAYER[color];
    })
    checkWinner();
    if (winner){
        msgEl.textContent = `Congratulations, player ${PLAYER[winner].toUpperCase()}, a winner is you!`;
        document.getElementById('reset').style.display = "block";
    } else {
        msgEl.textContent = `${PLAYER[turn].toUpperCase()}'s Turn`;
    }
}

function initialize(){
    board = [
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [1, null, null, null, null, null, null, null, null, null, null, null, -1],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null, null, null, null]
    ];
    turn = 1;
    winner = null;
    render();
    document.getElementById('reset').style.display = "none";
}