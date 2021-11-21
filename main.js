'use strict';

// board's width, height : const
const WIDTH = 10;
const HEIGHT = 20;

// board : array
let board = new Array();

// blocks : array
// rotation : clockwise rotation
const BLOCKS = {
	shape__1: {
		w: [[0,0], [0,1], [1,0], [1,1]],
		d: [[0,0], [0,1], [1,0], [1,1]],
		s: [[0,0], [0,1], [1,0], [1,1]],
		a: [[0,0], [0,1], [1,0], [1,1]]
	},
	shape__2: {
		w: [[0,1],[1,0],[1,1],[1,2]],
		d: [[0,0],[1,0],[1,1],[2,0]],
		s: [[0,0],[0,1],[0,2],[1,1]],
		a: [[0,1],[1,0],[1,1],[2,1]]
	},
	shape__3: {
		w: [[0,0],[1,0],[1,1],[1,2]],
		d: [[0,0],[0,1],[1,0],[2,0]],
		s: [[0,0],[0,1],[0,2],[1,2]],
		a: [[0,1],[1,1],[2,1],[2,0]]
	},
	shape__4: {
		w: [[1,0],[1,1],[1,2],[0,2]],
		d: [[0,0],[1,0],[2,0],[2,1]],
		s: [[0,0],[0,1],[0,2],[1,0]],
		a: [[0,0],[0,1],[1,1],[2,1]]
	},
	shape__5: {
		w: [[0,0],[0,1],[1,1],[1,2]],
		d: [[0,1],[1,1],[1,0],[2,0]],
		s: [[0,0],[0,1],[1,1],[1,2]],
		a: [[0,1],[1,1],[1,0],[2,0]]
	},
	shape__6: {
		w: [[0,1],[0,2],[1,0],[1,1]],
		d: [[0,0],[1,0],[1,1],[2,1]],
		s: [[0,1],[0,2],[1,0],[1,1]],
		a: [[0,0],[1,0],[1,1],[2,1]]
	},
	shape__7: {
		w: [[0,0],[1,0],[2,0],[3,0]],
		d: [[0,0],[0,1],[0,2],[0,3]],
		s: [[0,0],[1,0],[2,0],[3,0]],
		a: [[0,0],[1,0],[2,0],[3,0]]
	}
}

document.body.onload = create_board();
console.log(BLOCKS[0]);
create_block();




// function

// import

// create a board
function create_board() {
	const target = document.querySelector('#board');
	for(let i = 0; i < HEIGHT; i++) {
		board[i] = document.createElement("ul");
		const target_row = target.insertAdjacentElement('beforeend', board[i]);
		for(let j = 0; j < WIDTH; j++) {
			board[i][j] = document.createElement("li");
			target_row.insertAdjacentElement('beforeend', board[i][j]);
		}
	}
}

// create a block
function create_block() {
	const max_spaces = 4;
	for(let i = 0; i < max_spaces; i++) {
		const x = BLOCKS.shape__5.w[i][0];
		const y = BLOCKS.shape__5.w[i][1];
		board[x][y].style.setProperty('background-color', 'pink');
	}
}
