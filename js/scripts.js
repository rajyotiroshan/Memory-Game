let bars, trophy,stars, refresh,move, full_screen_icon, cards,game_board;
let current_flipped_card=null, previous_flipped_card=null;
let move_count = 0;
let isRefreshing = false,isFullScreen=false;//no of card currently flipped
let random_no = [],count,id;
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

/* check if no is generated twice already*/
function validateRandomNo(n){
	//check if no is aleady generated once
	if(!random_no.includes(n)){//if not generated push to random_no
		random_no.push(n);
		//return true as no is not generated yet.
		return true;
	}
	else{//is generated once
		//access it's index
		let index = random_no.indexOf(n);//gives index of fist occurrence.
		//check if is generated twice
		if(random_no.indexOf(n,index+1) === -1){//n does not exist after index.
			random_no.push(n);
			return true;
		}
		else {//already generated twice
			return	false;
		}
	}
}

/* randomly assign no from 1-16 to the div.back-face*/
function assignValueToBackFace(){
	//if refreshed make random_no array empty
	if(isRefreshing){
		random_no = [];
	}
	let randomNO;
	for(let i=0; i<cards.length; i++){
		randomNO = generateRandomNo();
		//generate until validate.
		while(!validateRandomNo(randomNO)){
			 randomNO = generateRandomNo();
		 }
		if(isRefreshing){// if is called as refresh-icon click listener.
		cards[i].classList.remove("is-flipped");//for refresh-icon clicked
			if( cards[i].classList.contains("matched")){//card is matched,all listener are removed.
				//add addEventListener
				cards[i].onmousedown = flipCards;
				cards[i].onmouseup = isCardMatched;
				//remove matched efffect
				cards[i].classList.remove("matched");
			}
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
	card.removeEventListener("mousedown", flipCards);
	card.removeEventListener("mouseup", isCardMatched);

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

/* pause */
function pause(pause_time_ms) {//pause time in sec.
	let start = new Date().getTime();
	for(let i =1; i<1e7; i++){
		if(((new Date().getTime()) - start) > pause_time_ms){
			break;
		}
	}
}

/* flip  cards */
function flipCards(e){
	let card  = e.currentTarget;
	if(current_flipped_card == null){
		current_flipped_card = card;
		current_flipped_card.classList.toggle("is-flipped");
		//remove handler.
		removeHandler(current_flipped_card);
		return;
	}
	else if (previous_flipped_card == null) {
		previous_flipped_card = current_flipped_card;
		current_flipped_card = card;
		current_flipped_card.classList.toggle("is-flipped");
		move.textContent = ++move_count;
		giveStar();
		//pause(500);

		/*count = 0;
		id = setInterval(function(){
			count = count + 1;
			if(count >=5){//if called 5 times
				clearInterval(id);
			}
		},100);*/
	}

}

/* mouseup event on card handler*/
function isCardMatched(e){
		if(cardMatched()){//card content matched
			//show natched effect on cards.
			current_flipped_card.classList.toggle("matched");
			previous_flipped_card.classList.toggle("matched");
			//remove evt listener on cards.
			removeHandler(current_flipped_card);
			removeHandler(previous_flipped_card);
	}
	else {//card's content did not match.
		//show unmatched effect.
		current_flipped_card.classList.toggle("unmatched");
		previous_flipped_card.classList.toggle("unmatched");
		//show front face again or hide content or flip to show front face.
		current_flipped_card.classList.toggle("is-flipped");
		previous_flipped_card.classList.toggle("is-flipped");
		//remove unmatched effect.
		current_flipped_card.classList.toggle("unmatched");
		previous_flipped_card.classList.toggle("unmatched");
		//since card did not match add evt listener again to flipped cards.
		current_flipped_card.addEventListener("mousedown",flipCards);
		current_flipped_card.addEventListener("mouseup", isCardMatched);
		previous_flipped_card.addEventListener("mousedown",flipCards);
		previous_flipped_card.addEventListener("mouseup",isCardMatched);
	}
	//make both cards to nul for next round of mousedown and mouseup evt.
	current_flipped_card = null;
	previous_flipped_card = null;
}

/* card matched effect*/
function cardMatched(){
	return current_flipped_card.lastElementChild.textContent === previous_flipped_card.lastElementChild.textContent;
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
	//on mousedown flip card first time.
	cards[i].addEventListener("mousedown",flipCards);
	//on mouseup check euality for card content and perform corresponding effect on cards.
	cards[i].addEventListener("mouseup",isCardMatched);
}

/* assign no*/
assignValueToBackFace();
