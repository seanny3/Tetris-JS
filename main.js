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
			[[0,0],[1,0],[2,0],[3,0]]
		]
];
	

document.body.onload = create_board();
const random_block = Math.floor(Math.random()*7);
const current_block = create_block(random_block);

// keyboard eventlistener
let keydown_num = 0;
document.addEventListener('keydown', (event) => {
	const SPACEBAR = ' ';
	if(event.key === SPACEBAR) {
		delete_block(current_block, keydown_num);
		keydown_num = ++keydown_num % 4
		rotate_block(current_block, keydown_num);
	}
	
})




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
function create_block(shape, direction = 0) {
	const MAX_SPACES = 4;
	for(let space = 0; space < MAX_SPACES; space++) {
		const x = BLOCKS[shape][direction][space][0];
		const y = BLOCKS[shape][direction][space][1];
		board[x][y].style.setProperty('background-color', 'pink');
	}
	return BLOCKS[shape];
}

// delete a existing block
function delete_block(shape, direction) {
	const MAX_SPACES = 4;
	for(let space = 0; space < MAX_SPACES; space++) {
		const x = shape[direction][space][0];
		const y = shape[direction][space][1];
		board[x][y].style.setProperty('background-color', 'white');
	}
}

// rotate a block
function rotate_block(shape, direction) {
	const MAX_SPACES = 4;
	for(let space = 0; space < MAX_SPACES; space++) {
		const x = shape[direction][space][0];
		const y = shape[direction][space][1];
		board[x][y].style.setProperty('background-color', 'pink');
	}
	console.log(shape[direction]);
}
