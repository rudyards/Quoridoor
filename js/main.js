/*----- constants -----*/ 
const PLAYER = {
  '1': 'lime',
  '-1': 'purple',
  'null': 'white'
}

/*----- app's state (variables) -----*/
var board, winner, turn

/*----- cached element references -----*/ 
const msgEl = document.getElementById('msg');
const boardEl = document.querySelectorAll('td');

/*----- event listeners -----*/ 


/*----- functions -----*/
initialize();


function render(){
    msgEl.textContent = `${PLAYER[turn].toUpperCase()}'s Turn`;
    boardEl.forEach(function(square, indx){
        var target = boardEl[indx].id;
        target = target.split('r');
        var row = target[1];
        var col = target[0].replace('c', '');
        var color = board[row][col]
        boardEl[indx].style.background = PLAYER[color];
    })
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
}