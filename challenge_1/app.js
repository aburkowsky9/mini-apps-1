//account for clicks on positioned areas!!!!!!!!!!!!!!!

//keep track of move count
let moveCt = 0;
let winner = 'X';
let loser = 'O';
let board = {
  0: [null, null, null], 
  1: [null, null, null],
  2: [null, null, null] 
}
const positions = document.getElementsByClassName('position');
const button = document.getElementById('reset-button');

const positionClickHandler = (event) => {
  //if moveCt is less than 9 and position is not already taken
  if (moveCt < 9 && !event.target.innerHTML) {
    moveExecuter(event);
  }
};

//set up click listener for each <td>
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < positions.length; i++) { 
    positions[i].addEventListener('click', positionClickHandler);
  }

  //set up click listener for reset button
  button.addEventListener('click', () => {
    //reset memory board, moveCt, and clear positions
    board = {
      0: [null, null, null],
      1: [null, null, null],
      2: [null, null, null] 
    };
    
    moveCt = 0;
    //reset win or tie message in footer
    document.getElementById('announcement').innerHTML = '';
    
    for (let i = 0; i < positions.length; i++) { 
      positions[i].innerHTML = '';
      positions[i].addEventListener('click', positionClickHandler);
    }
  });
});

const moveExecuter = (event) => {
  //increment move counter and prevent moves after 9
  var moveType;
  moveCt++;
  //alternate even/odd moves for players
  if (moveCt % 2 !== 0) {
    event.target.innerHTML = winner;
    moveType = winner;
    adjustBoard(event.target.id, winner);
  } else {
    event.target.innerHTML = loser;
    moveType = loser;
    adjustBoard(event.target.id, loser);
  }

  if (moveCt >= 3) {
    checkForWin(event.target.id, moveType);
  }
};

const adjustBoard = (id, input) => {
  const split = id.split(',');
  const [row, column] = split;
  
  board[row][column] = input;
};

//check for wins via rows, columns, or diagonals
const checkForWin = (id, moveType) => {
  const split = id.split(',');
  const [row, column] = split;
  var rowWin = hasRow(row, moveType);
  var columnWin = hasColumn(column, moveType);
  var diagWin;
  
  if (onDiagonal(row, column)) {
    diagWin = hasDiagonal(row, column, moveType);
  }
  
  if (rowWin || columnWin || diagWin) {
    console.log('WIN!')
    for (var i = 0; i < positions.length; i++) { 
      positions[i].removeEventListener('click', positionClickHandler);
    }
    //announce win!!!
    announcement('win', moveType);
    incrementScoreBoard(moveType);
  } else if (moveCt === 9) {
    announcement('Tie')
  }  
};

const hasRow = (row, moveType) => {
  return hasWon(board[row], moveType);
};

const hasColumn = (column, moveType) => {
  let columnArr = [];
  for (var row in board) {
    columnArr.push(board[row][column]);
  }
  return hasWon(columnArr, moveType);
};

const onDiagonal = (row, column) => {
  return (row === column || (row === '0' && column === '2') || (row === '2' && column === '0'));
};

const hasDiagonal = (row, column, moveType) => {
  var major = [board[0][0], board[1][1], board[2][2]];
  var minor = [board[0][2], board[1][1], board[2][0]];
  var hasDiagonalWin = hasWon(major, moveType) || hasWon(minor, moveType);
  
  return hasDiagonalWin;
};

//win calculator reducer for rows, columns, diagonals
const hasWon = (array, moveType) => {
  return array.reduce((acc, elem) => {
    return (acc && (elem === moveType));
  }, true);
};

const announcement = (winOrTie, moveType) => {
  var newParagraph = document.createElement('p');
  var announcementDiv = document.getElementById('announcement');
  if (winOrTie === 'win') {
    newParagraph.innerHTML = `Player ${moveType} has taken the ${winOrTie}!!!`;
  } else {
    newParagraph.innerHTML = `${winOrTie}: There are no winners or losers here, but we all tried our best!`;
  }
  announcementDiv.appendChild(newParagraph);
}

const incrementScoreBoard = (moveType) => {
  var score = document.getElementById(`${moveType}-win`).innerHTML;
  score = (Number(score) + 1).toString();
  document.getElementById(`${moveType}-win`).innerHTML = score;

  //change winner and loser global variables
  winner = moveType;

  if (winner === 'X') {
    loser = 'O';
  } else {
    loser = 'X';
  }
}