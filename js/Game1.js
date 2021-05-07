const no_of_row = 4;
const no_of_col = 3;
const min = 1;
const max = no_of_row * no_of_col;
const timer = 2;

const no_of_turns = 5;
let current_turn = no_of_turns;

let counter = 0;

let start_game_time, end_game_time;

// adding rows and cols to the page
for (let r = 1; r <= no_of_row; r++) {
	// rows
	$("#game1-wrapper").append(
		$("<div>", {
			class: "row row-cols ",
		})
	);

	for (let c = 1; c <= no_of_col; c++) {
		// cols
		$(`#game1-wrapper > .row:nth-child(${r})`).append(
			$("<col>", {
				class: "col m-1 border border-3 border-primary",
				id: `col${++counter}`,
			})
		);
	}
}

// makeing row responsive
$(".row").css("min-height", `calc(1 / ${no_of_row} * 90%)`);

/*
genrate random number
including min and max value
works with negative numbers also
*/
function getRandomNumber(min, max) {
	if (min > max) {
		let temp = max;
		max = min;
		min = temp;
	}

	if (min <= 0) {
		return Math.floor(Math.random() * (max + Math.abs(min) + 1)) + min;
	} else {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

function nextBlockToClick() {
	let ran = getRandomNumber(min, max);
	let ran_selector = `#col${ran}`;
	$(ran_selector).addClass("bg-primary");

	$(ran_selector).click(function () {
		$(ran_selector).removeClass("bg-primary");
		$(ran_selector).off("click");

		if (--current_turn === 0) {
			end_game_time = new Date().getTime();
			let time_required = (end_game_time - start_game_time) / 1000;
			alert(
				`\nYou Clicked ${no_of_turns} boxes in ${time_required} seconds`
			);

			current_turn = no_of_turns;
			startGameTimer(timer);
		} else {
			nextBlockToClick();
		}
	});
}

function startGameTimer(timer) {
	$("#stats").text(`Game starting in ${timer} Seconds`);
	setTimeout(function () {
		if (--timer === 0) {
			$("#stats").text("Go Go Go");
			start_game_time = new Date().getTime();
			nextBlockToClick();
		} else {
			startGameTimer(timer);
		}
	}, 1000);
}

startGameTimer(timer);
