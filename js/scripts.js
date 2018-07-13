let bars, trophy,stars, refresh,move, full_screen_icon, cards,game_board;
let current_flipped_card=null, previous_flipped_card=null;
let move_count = 0;
let isRefreshing = false,isFullScreen=false;//no of card currently flipped
bars = document.querySelector(".bars");
trophy = document.querySelector(".trophy");
stars = document.querySelectorAll(".star");
move = document.querySelector(".move");
cards = document.querySelectorAll(".card");
refresh = document.querySelector(".refresh-icon");
full_screen_icon = document.querySelector(".fs-icon");
game_board = document.querySelector(".game-board");
/* generate random integer from 1 and 16 */
function generateRandomNo(){
	let n = Math.random();// between 0 and 1
	n = 8 * n;// 0 and 16
	n = Math.ceil(n);//integer bw 8
	return n;
}
/* randomly assign no from 1-16 to the div.back-face*/
function assignValueToBackFace(){
	let randomNO;
	for(let i=0; i<cards.length; i++){
		randomNO = generateRandomNo();
		if(isRefreshing){// if is called as refresh-icon click listener.
		cards[i].classList.remove("is-flipped");//for refresh-icon clicked
		setTimeout(function(){cards[i].children[1].innerText = randomNO;},100);
		continue;
	}
	cards[i].children[1].innerText = randomNO;
	}
}

/* bars click listener*/
function toggleUser(e){
	let user = document.querySelector(".user");
  let scorer = document.querySelector(".top-scorer");
  //first toggle top-scorer
  if(scorer.classList.contains("scorer-open-close")){
    scorer.classList.toggle("scorer-open-close");
    }
	user.classList.toggle("user-open-close") ;
}

/* trophy click listener*/
function toggleScorer(e) {
  let scorer = document.querySelector(".top-scorer");
  let user = document.querySelector(".user");
  //first toggle toggle toggle user
  if(user.classList.contains("user-open-close")){
    user.classList.toggle("user-open-close");
  }
  scorer.classList.toggle("scorer-open-close");
}

/*remove click listener on card*/
function removeHandler(card){
	card.removeEventListener("click", cardClickedListener);
}
/*decide for star based on move_count*/
function giveStar(){
	if(move_count >= 20){//no star condition.
		//remove first star.
		stars[0].style.color = "wheat";
	}
	//one star condition
	else if(move_count >= 18 ){//one star condition.
		//remove 2nd star.
		stars[1].style.color = "wheat";
	}
	else if(move_count >= 14){//two star condition.
		//remove last star.
		stars[2].style.color = "wheat";
	}
}
/* flip  cards */
function flipCards(card){
	if(current_flipped_card == null){
		current_flipped_card = card;
		current_flipped_card.classList.toggle("is-flipped");
		return 1;
	}
	else if (previous_flipped_card == null) {
		previous_flipped_card = current_flipped_card;
		current_flipped_card = card;
		current_flipped_card.classList.toggle("is-flipped");
		move.textContent = ++move_count;
		giveStar();
	}
}

/*card unmatche effect*/
function cardUnmatched(){
	current_flipped_card.classList.toggle("unmatched");
	previous_flipped_card.classList.toggle("unmatched");
	current_flipped_card.classList.toggle("is-flipped");
	previous_flipped_card.classList.toggle("is-flipped");
	current_flipped_card.classList.toggle("unmatched");
	previous_flipped_card.classList.toggle("unmatched");
}
/* card matched effect*/
function cardMatched(){
	removeHandler(current_flipped_card);
	removeHandler(previous_flipped_card);
	current_flipped_card.classList.toggle("matched");
	previous_flipped_card.classList.toggle("matched");
}
/*click listener on card*/
function cardClickedListener(e) {
	let card = e.currentTarget;
	if(flipCards(card) == 1){return;};
	if(previous_flipped_card != null && current_flipped_card.lastElementChild.textContent !== previous_flipped_card.lastElementChild.textContent){
		cardUnmatched();
	}
	else {
		cardMatched();
	}
		current_flipped_card = null;
		previous_flipped_card = null;
}

/* full-screen listener*/
function toggleFullSCreeen(e){
	isFullScreen = true;
	game_board.classList.toggle("full-screen");
}

/* register click event on bars*/
bars.addEventListener("click",toggleUser);

/*register click event on trophy*/
trophy.addEventListener("click",toggleScorer);

/*register click listener to refresh-icon*/
refresh.addEventListener("click",function(e){
	//first make isRefreshing true
	isRefreshing = true;
	assignValueToBackFace();
	//make again false
	isRefreshing = false;
});

/*register click listener on full_screen_icon*/
full_screen_icon.addEventListener("click",toggleFullSCreeen);
/*exit full screen */
document.addEventListener("keydown",function(e){
if(isFullScreen) {
	if(e.code === "Escape" || e.key === "Escape" || e.keycode === 27){
		game_board.classList.toggle("full-screen");
		isFullScreen = false;
		}
	else {
			window.alert("Enter esc key to exit full screen");
		}
	}
});
/* register click listener on card*/
for(let i=0; i<cards.length; i++){
	cards[i].addEventListener("click",cardClickedListener);
}
/* assign no*/
assignValueToBackFace();
