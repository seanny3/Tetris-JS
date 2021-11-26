'use strict';


// blocks : array
// rotation : clockwise rotation

// board's width, height : const
const WIDTH = 10;
const HEIGHT = 24;
// board
var board = new Array();
	
// create an undefiend direction ( current_block = BLOCK[shape] )
var current_block;
var create_count = 0;
var is_freeze = false;
var gameover = false;
var direction = 0;	// increase by 1 every time when you press 

// get Left Time
var time = 100;
var timer = setInterval(setLeftTime, 1000);
// loop
const speed = 300;
var loop = setInterval(gameLoop, speed);
// main
document.body.onload = create_board();






// keyboard eventlistener
document.addEventListener('keydown', (event) => {
	// 바닥에 부딪혔을 때 'keydown'이벤트 중지
	if(is_freeze || gameover) {
		return;
	}
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

// init
function init_block() {
	current_block = create_block();
	direction = 0;
	loop = setInterval(gameLoop, speed);
	is_freeze = false;
}
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
	const blocks = BLOCKS[Math.floor(Math.random()*7)];
	const MAX = 4;
	blocks.forEach((block) => {
		block.forEach((space) => {
			space[1] += 4;
		})
	})
	for(let space = 0; space < MAX; space++) {
		let upDown = blocks[0][space][0];
		let side = blocks[0][space][1];
		board[upDown][side].style.setProperty('background-color', 'pink');
	}
	return blocks;
}
// delete a existing block
function delete_block(block) {
	const MAX = 4;
	for(let space = 0; space < MAX; space++) {
		let upDown = block[space][0];
		let side = block[space][1];
		board[upDown][side].classList.remove('current');
		board[upDown][side].style.removeProperty('background-color');
	}
}
// rotate a block
function rotate_block(block, current_direction, prev_direction) {
	if(is_crash(block, current_direction)) {
		direction = prev_direction;
		return;
	}
	delete_block(block[prev_direction]);
	const MAX = 4;
	for(let space = 0; space < MAX; space++) {
		let upDown = block[current_direction][space][0];
		let side = block[current_direction][space][1];
		board[upDown][side].classList.add('current');
		board[upDown][side].style.setProperty('background-color', 'pink');
	}
}
// move a block
function move_block(block, current_direction, move_upDown, move_side) {
	if(is_crash(block, current_direction, move_upDown, move_side)) {
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
		board[upDown][side].classList.add('current');
		board[upDown][side].style.setProperty('background-color', 'pink');
	}
}
// freeze block
function freeze_block(block, current_direction) {
	is_freeze = true;
	const MAX = 4;
	for(let space = 0; space < MAX; space++) {
		let loc_a = block[current_direction][space][0];
		let loc_b = block[current_direction][space][1];
		board[loc_a][loc_b].classList.add('freeze');
	}
}
// crash check
function is_crash(block, current_direction, move_upDown=0, move_side=0) {
	let aboveFloor = true;
	let bool = false;
	block[current_direction].forEach((space) => {
		// 바닥 충돌 확인
		if(space[0] + move_upDown >= HEIGHT) {
			bool = true;
			aboveFloor = false;
		}
		// 벽 충돌 확인
		if(space[1] + move_side < 0 || space[1] + move_side >= WIDTH) {
			bool = true;
		}
		// 블럭 충돌 확인
		// try {
		// 	console.log(`[${space[0]},${space[1]}]`);
		// 	console.log(`right: ${board[space[0]][space[1]+2].classList.contains('freeze')}`)
		// 	console.log(`left: ${board[space[0]][space[1]-2].classList.contains('freeze')}`)
		// 	console.log(`down: ${board[space[0]+1][space[1]].classList.contains('freeze')}`)
		// } catch(e) {}
		
		try {
			if(
				(board[space[0]+1][space[1]].classList.contains('freeze'))
				) {

					bool = true;
					console.log('블럭이랑 부딪힘!!!');
					clearInterval(loop);
					freeze_block(block, current_direction);
					init_block();
					return bool;
				}
		} catch(e) {
	
		}

	})

	// 충돌 후 다음 블럭 생성
	if(!aboveFloor) {
		clearInterval(loop);
		freeze_block(block, current_direction);
		init_block();
	}
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
		gameover = true;
		clock.innerHTML = "게임오버!";
		return;
	}
}

// gameLoop
function gameLoop() {
	if(create_count === 0) {
		current_block = create_block();
		create_count++;
	}
	move_block(current_block, direction, 1, 0);
}


