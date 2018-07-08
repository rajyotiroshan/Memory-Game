let bars, trophy, cards;
let current_flipped_card=null, previous_flipped_card=null;
let cardClickedCounter = 0;//no of card currently flipped
bars = document.querySelector(".bars");
trophy = document.querySelector(".trophy");
cards = document.querySelectorAll(".card");

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

/*click listener on card*/
function cardClickedListener(e) {
	if(current_flipped_card === null){
		current_flipped_card = e.currentTarget;
		current_flipped_card.classList.toggle("is-flipped");
		return;
	}
	else if (previous_flipped_card === null) {
		previous_flipped_card = current_flipped_card;
		current_flipped_card = e.currentTarget;
		current_flipped_card.classList.toggle("is-flipped");
	}
	if(previous_flipped_card != null && current_flipped_card.lastElementChild.textContent !== previous_flipped_card.lastElementChild.textContent){
		current_flipped_card.classList.toggle("is-flipped");
		previous_flipped_card.classList.toggle("is-flipped");
	}
	else {
		removeHandler(current_flipped_card);
		removeHandler(previous_flipped_card);
	}
		current_flipped_card = null;
		previous_flipped_card = null;
}

/* register click event on bars*/
bars.addEventListener("click",toggleUser);
/*register click event on trophy*/
trophy.addEventListener("click",toggleScorer);
/* register click listener on card*/
for(let i=0; i<cards.length; i++){
	cards[i].addEventListener("click",cardClickedListener);
}
/* assign no*/
assignValueToBackFace();
