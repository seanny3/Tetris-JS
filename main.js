'use strict';

// board's width, height : const
const WIDTH = 10;
const HEIGHT = 20;

// board : array
let board = new Array();

// blocks : array
// rotation : clockwise rotation
const BLOCKS = [ 
		[		// shape__1
			[[0,0],[0,1],[1,0],[1,1]],
			[[0,0],[0,1],[1,0],[1,1]],
			[[0,0],[0,1],[1,0],[1,1]],
			[[0,0],[0,1],[1,0],[1,1]]
		],[	// shape__2
			[[0,1],[1,0],[1,1],[1,2]],
			[[0,0],[1,0],[1,1],[2,0]],
			[[0,0],[0,1],[0,2],[1,1]],
			[[0,1],[1,0],[1,1],[2,1]]
		],[	// shape__3
			[[0,0],[1,0],[1,1],[1,2]],
			[[0,0],[0,1],[1,0],[2,0]],
			[[0,0],[0,1],[0,2],[1,2]],
			[[0,1],[1,1],[2,1],[2,0]]
		],[	// shape__4
			[[1,0],[1,1],[1,2],[0,2]],
			[[0,0],[1,0],[2,0],[2,1]],
			[[0,0],[0,1],[0,2],[1,0]],
			[[0,0],[0,1],[1,1],[2,1]]
		],[	// shape__5
			[[0,0],[0,1],[1,1],[1,2]],
			[[0,1],[1,1],[1,0],[2,0]],
			[[0,0],[0,1],[1,1],[1,2]],
			[[0,1],[1,1],[1,0],[2,0]]
		],[	// shape__6
			[[0,1],[0,2],[1,0],[1,1]],
			[[0,0],[1,0],[1,1],[2,1]],
			[[0,1],[0,2],[1,0],[1,1]],
			[[0,0],[1,0],[1,1],[2,1]]
		],[	// shape__7
			[[0,0],[1,0],[2,0],[3,0]],
			[[0,0],[0,1],[0,2],[0,3]],
			[[0,0],[1,0],[2,0],[3,0]],
			[[0,0],[0,1],[0,2],[0,3]]
		]
];
// BLOCKS[shape][direction][space][upDown,side]

document.body.onload = create_board();
const current_block = create_block();		// create an undefiend direction ( return: BLOCK[shape][?] )

// keyboard eventlistener
let direction = 0;	// increase by 1 every time when you press SPACEBAR (0~3) --> defined direction
document.addEventListener('keydown', (event) => {
	const SPACEBAR = ' ';
	if(event.key === SPACEBAR) {
		delete_block(current_block[direction]);
		direction = ++direction % 4;
		rotate_block(current_block[direction]);
	} 
	else if (event.key === 'ArrowRight') {
		delete_block(current_block[direction]);
		move_block(current_block, direction, 0, 1);
	} 
	else if (event.key === 'ArrowLeft') {
		delete_block(current_block[direction]);
		move_block(current_block, direction, 0, -1);
	} 
	else if (event.key === 'ArrowDown') {
		delete_block(current_block[direction]);
		move_block(current_block, direction, 1, 0);
	}
	else {
		return;
	}
				
	
})




// functions

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
	const block = BLOCKS[Math.floor(Math.random()*7)];
	const MAX = 4;
	for(let space = 0; space < MAX; space++) {
		let upDown = block[0][space][0];
		let side = block[0][space][1];
		board[upDown][side].style.setProperty('background-color', 'pink');
	}
	return block;
}
// delete a existing block
function delete_block(block) {
	const MAX = 4;
	for(let space = 0; space < MAX; space++) {
		let upDown = block[space][0];
		let side = block[space][1];
		board[upDown][side].style.setProperty('background-color', 'white');
	}
}
// rotate a block
function rotate_block(block) {
	const MAX = 4;
	for(let space = 0; space < MAX; space++) {
		let upDown = block[space][0];
		let side = block[space][1];
		board[upDown][side].style.setProperty('background-color', 'pink');
	}
}
// move a block
function move_block(block, current_direction, move_upDown, move_side) {
	const MAX = 4;
	for(let direction = 0; direction < MAX; direction++) {
		for(let space = 0; space < MAX; space++) {
			block[direction][space][0] += move_upDown;
			block[direction][space][1] += move_side;
		}
	}
	for(let space = 0; space < MAX; space++) {
		let upDown = block[current_direction][space][0];
		let side = block[current_direction][space][1];
		board[upDown][side].style.setProperty('background-color', 'pink');
	}
}
