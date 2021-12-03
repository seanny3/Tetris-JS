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
var score = 0;
var direction = 0;	// increase by 1 every time when you press 

// get Left Time
var time = 100;
var timer = setInterval(setLeftTime, 1000);
// loop
const speed = 300;
var loop;
// main
document.body.onload = create_board();


getPoint(score);
init_block();



// keyboard eventlistener
document.addEventListener('keydown', (event) => {
	// 바닥에 부딪혔을 때 'keydown'이벤트 중지
	if(is_freeze || gameover) {
		return;
	}
	const SPACEBAR = ' ';
	switch(event.key) {
		case 'ArrowUp':
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
		case SPACEBAR:
			break;
		default:
			break;
	}
})

// click menu
var click_menu = false;
const goMenu = document.querySelector('.go__menu');
goMenu.addEventListener('click', () => {
	const menuBox = document.getElementById("menu");
	menuBox.classList.toggle('active');
	// stop gameloop,timer
	if(!click_menu) {
		clearInterval(timer);
		clearInterval(loop);
		click_menu = true;
	}
	else if(click_menu){
		loop = setInterval(gameLoop, speed);
		timer = setInterval(setLeftTime, 1000);
		click_menu = false;
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
			[[0,0],[0,1],[0,2],[0,3]],
			[[0,0],[1,0],[2,0],[3,0]],
			[[0,0],[0,1],[0,2],[0,3]],
			[[0,0],[1,0],[2,0],[3,0]]
		]
	];
	const blocks = BLOCKS[Math.floor(Math.random()*7)];
	const MAX = 4;
	blocks.forEach((block) => {
		block.forEach((space) => {
			space[0] += 1;
			space[1] += 4;
		})
	})
	for(let space = 0; space < MAX; space++) {
		let upDown = blocks[0][space][0];
		let side = blocks[0][space][1];
		try {
			board[upDown][side].classList.add('current');
		} catch(e) {}
	}
	return blocks;
}
// delete a existing block
function delete_block(block) {
	const MAX = 4;
	for(let space = 0; space < MAX; space++) {
		let upDown = block[space][0];
		let side = block[space][1];
		try {
			board[upDown][side].classList.remove('current');
		} catch(e) {}
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
		try {
			board[upDown][side].classList.add('current');
		} catch(e) {}
		
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
		try {
			board[upDown][side].classList.add('current');
		} catch(e) {}
		
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
		// 천장 충돌 확인
		if(loc_a < 5) {
			gameover = true;
			clearInterval(timer);
			delete_block(block, current_direction);
		}
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
		try {
			if(
				(board[space[0]+1][space[1]].classList.contains('freeze'))
				) {
					bool = true;
					aboveFloor = false;
				}
		} catch(e) {
		}
	})
	// 충돌 후 다음 블럭 생성
	if(!aboveFloor) {
		clearInterval(loop);
		freeze_block(block, current_direction);
		delete_line();
		init_block();
	}
	return bool;
}
// getting points
function line_check() {
	let count = 0;
	let full_line = Array.from({length: HEIGHT-4}, () => false);
	for(let line = 4; line < HEIGHT; line++) {
		for(let space = 0; space < WIDTH; space++) {
			try {
				if(board[line][space].classList.contains('freeze')) {
					count++;
				}
			} catch(e) {
			}
		}
		if(count === 10) {
			full_line[line] = true;
			getPoint(1);
		}
		count = 0;
	}
	return full_line;
}

function delete_line() {
	const lines = line_check();
	for(let line = 0; line < lines.length; line++) {
		if(lines[line]) {
			//console.log(`${line} : ${lines[line]}`);
			// delete
			for(let space = 0; space < WIDTH; space++) {
				board[line][space].classList.remove('current');
				board[line][space].classList.remove('freeze');
			}
			// move down
			for(let i = line-1; i > 3; i--) {
				for(let j = 0; j < WIDTH; j++) {
					if(board[i][j].classList.contains('freeze')) {
						board[i][j].classList.remove('current');
						board[i][j].classList.remove('freeze');
						board[i+1][j].classList.add('current');
						board[i+1][j].classList.add('freeze');
						// effect
					}
				}
			}
		}
	}
}
function getPoint(s) {
	const getScore = document.getElementById('score');
	const getLine = document.getElementById('line');
	score += s;
	getScore.innerHTML = score*100;
	getLine.innerHTML = score;
	getScore.classList.add('effect');
	getLine.classList.add('effect');
	setTimeout(() => {
		getScore.classList.remove('effect');
		getLine.classList.remove('effect');
	},300)
}

// real-time function

// timer
function setLeftTime() {
	const clock = document.getElementById('timer');
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
	if(gameover) {
		return;
	}
	move_block(current_block, direction, 1, 0);
}




// another way
// HTML : wall, floor, ceiling, freeze 클래스 설정
// JS : 매 loop 마다 side, upDown classList.contains 검사 


