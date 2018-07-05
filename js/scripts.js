let bars,trophy,cards;
let cardClickedCounter = 0;//no of card currently flipped
bars = document.querySelector(".bars");
trophy = document.querySelector(".trophy");
cards = document.querySelectorAll(".card");

/* generate random integer from 1 and 16 */
function generateRandomNo(){
	let n = Math.random();// between 0 and 1_
	n = 8 * n;// 0 and 16
	n = Math.ceil(n);//integer bw 0 16
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

/*click listener on card*/
function cardClickedListener(e) {
	e.target.classList.toggle("is-flipped");
}

function addClickEvent(card){
	card.addEventListener("click",function(e){
		card.classList.toggle("is-flipped");
	});
}

/* register click event on bars*/
bars.addEventListener("click",toggleUser);
/*register click event on trophy*/
trophy.addEventListener("click",toggleScorer);
/* register click listener on card*/
for(let i=0; i<cards.length; i++){
	addClickEvent(cards[i]);
}
/* assign no*/
assignValueToBackFace();
