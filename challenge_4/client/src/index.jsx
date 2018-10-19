import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// const Score = (props) => {

// }


const Row = (props) => {
	return (
		<tr className={ `row-${props.rowNum}` }>
			<td className={ `position ${props.rowNum},0` } onClick={ (event)=> {props.handlePositionClick(event.target)} } ></td>
			<td className={ `position ${props.rowNum},1` } onClick={ (event)=> {props.handlePositionClick(event.target)} } ></td>
			<td className={ `position ${props.rowNum},2` } onClick={ (event)=> {props.handlePositionClick(event.target)} } ></td>
			<td className={ `position ${props.rowNum},3` } onClick={ (event)=> {props.handlePositionClick(event.target)} } ></td>
			<td className={ `position ${props.rowNum},4` } onClick={ (event)=> {props.handlePositionClick(event.target)} } ></td>
			<td className={ `position ${props.rowNum},5` } onClick={ (event)=> {props.handlePositionClick(event.target)} } ></td>
			<td className={ `position ${props.rowNum},6` } onClick={ (event)=> {props.handlePositionClick(event.target)} } ></td>
		</tr>
	)
}


const Game = (props) => {
	return (
		<div className="tableContainer">
			<table className="table">
				<tbody className="gameBoard">
					{props.board.map((gameRow, i) =>
					    <Row key={i.toString()} rowNum={ i.toString() } handlePositionClick ={ props.handlePositionClick } />

					)}
				</tbody>
			</table>
		</div>
	)
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: [
				[null, null, null, null, null, null, null], 
				[null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null],
				[null, null, null, null, null, null, null]
			],

			currentPlayer: 'black', 

		}

		this.handlePositionClick = this.handlePositionClick.bind(this);
		this.handleState = this.handleState.bind(this);
	}

	handlePositionClick(target) {
		var position = target.className.split(' ')[1].split(',');
		let row = Number(position[0]);
		let column = Number(position[1]);
		let board = this.state.board;

		if ((row === 5 || board[row + 1][column]) && !board[row][column]) {
			board[row][column] = this.state.currentPlayer;
			this.handleState(target, board);
			this.checkForWin(this.state.currentPlayer, row, column)
		}

	}

	handleState(target, board) {
		var player = this.state.currentPlayer;

		$(target).addClass(player);

		if (this.state.currentPlayer === 'black') {
			this.setState({ board: board, currentPlayer: 'red' });
		} else {
			this.setState({ board: board, currentPlayer: 'black' });
		}

	}

	// componentDidUpdate() {
	// 	this.checkForWin();
	// }

	checkForWin(player, row, column) {
		const rowWin = this.hasRow(row, player);
		const columnWin = this.hasColumn(column, player);
		// const diagWin;
		if (rowWin || columnWin) {
			console.log('fuck you, pay me!')
		}
	}

	onDiagonal() {
		//major diagonal = column - row
		//minor diagonal = column + row
	}

	hasRow(row, player) {
		let count = 0;
		const board = this.state.board;
		for (var i = 0; i < board[row].length; i++) {
			if (board[row][i] === player) {
				count++;
			} else {
				count = 0;
			}

			if (count === 4) {
				return true;
			}
		}
		return false;
	}

	hasColumn(column, player) {
		let count = 0;
		const board = this.state.board;
		const columnArr = [];

		board.forEach((row) => {
			columnArr.push(row[column]);
		})

		for (var i = 0; i < columnArr.length; i++) {
			if (columnArr[i] === player) {
				count++;
			} else {
				count = 0;
			}

			if (count === 4) {
				return true;
			}
		}
		return false;

	}

 	render () {
 		console.log(this.state.board);
    	return (
    		<div id="gameContainer">
    			<Game board={ this.state.board } handlePositionClick = { this.handlePositionClick } />
    		</div>
    	);
  	}
}


let domContainer = document.getElementById('app');
ReactDOM.render(<App />, domContainer);

// <div>
// 	<Score/>
// </div>