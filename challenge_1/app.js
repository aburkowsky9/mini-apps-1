//set up click listener for reset button!!!
//account for clicks on positioned areas

//keep track of move count
let moveCt = 0;
const board = {
  1: [null, null, null], 
  2: [null, null, null],
  3: [null, null, null] 
}
//set up click listener for each <td>
var positions = document.getElementsByTagName('td');

for (var i = 0; i < positions.length; i++) { 
  positions[i].addEventListener('click', (event) => {
    if (moveCt < 9) {
      moveExecuter(event, adjustBoard, winCalculator);
    }
  });
}


const moveExecuter = (event, adjustMemBoard, calculator) => {
  //increment move counter and prevent moves after 9
  moveCt++;
  
  //alternate even/odd moves for players
  if (moveCt % 2 !== 0) {
    event.target.innerHTML = 'X';
    adjustMemBoard(event.target.id, 'X');
  } else {
    event.target.innerHTML = 'O';
    adjustMemBoard(event.target.id, 'O');
  }

  if (moveCt >= 3) {
    calculator();
  }
};

const adjustBoard = (id, input) => {
  const split = id.split(',');
  const [row, column] = split;
  
  board[row][column - 1] = input;
  console.log(board);
};

const winCalculator = () => {
  //check rows
  
  //check columns
  //check diagonals
};