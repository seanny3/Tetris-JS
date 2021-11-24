'use strict';

// board's width, height : const
const WIDTH = 10;
const HEIGHT = 20;

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

// get Left Time
var time = 1;
var timer = setInterval(setLeftTime, 1000);

// loop
var loop = setInterval(gameLoop, 800);

// main
document.body.onload = create_board();
let current_block = create_block();		// create an undefiend direction ( current_block = BLOCK[shape] )







// keyboard eventlistener
let direction = 0;	// increase by 1 every time when you press SPACEBAR (0~3) --> defined direction
document.addEventListener('keydown', (event) => {
	const SPACEBAR = ' ';

	switch(event.key) {
		case SPACEBAR:
			let tmp = direction;
			direction = ++direction % 4;
			rotate_block(current_block, direction, tmp);
			break;
		case 'ArrowRight':
			move_block(current_block, direction, 0, 1);
			break;
		case 'ArrowLeft':  
			move_block(current_block, direction, 0, -1);
			break;
		case 'ArrowDown':
			move_block(current_block, direction, 1, 0);
			break;
		default:
			break;
	}
})


// block functions

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
		board[upDown][side].style.removeProperty('background-color');
	}
}
// rotate a block
function rotate_block(block, current_direction, prev_direction) {

	delete_block(block[prev_direction]);
	const MAX = 4;
	for(let space = 0; space < MAX; space++) {
		let upDown = block[current_direction][space][0];
		let side = block[current_direction][space][1];
		board[upDown][side].style.setProperty('background-color', 'pink');
	}
}
// move a block
function move_block(block, current_direction, move_upDown, move_side) {
	if(is_crash(block[current_direction], move_upDown, move_side)) {
		return;
	}
	delete_block(block[current_direction]);
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
// crash check
function is_crash(block, move_upDown, move_side) {
	let bool = false;
	
	block.some((space) => {
		if(space[0] + move_upDown >= HEIGHT) {
			bool =  true;
		}
		if(space[1] + move_side < 0 || space[1] + move_side >= WIDTH) {
			bool = true;
		}
	})
	return bool;
}



// real-time function

// timer
function setLeftTime() {
	const clock = document.querySelector('.clock');
	clock.innerHTML = time--;
	if(time < 0) {
		clearInterval(timer);
		clearInterval(loop);
		clock.innerHTML = "게임오버!";

		return;
	}
}

// gameLoop
function gameLoop() {
	move_block(current_block, direction, 1, 0);
}


