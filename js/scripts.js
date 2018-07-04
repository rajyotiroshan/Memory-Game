let bars;
bars = document.querySelector(".bars");
/* click on bars open user section at screen*/
function userOpen(e){
	let user = document.querySelector(".user");
	user.classList.toggle("user-open-close") ;
}

/*click listener on bars*/
bars.addEventListener("click",userOpen);
