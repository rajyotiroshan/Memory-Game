let game = document.querySelector("section.game");
game.addEventListener("click", function(e){
  console.log("inside");
document.querySelector(".page-header").classList.toggle("full-screen");
document.querySelector(".user").classList.toggle("full-screen");
document.querySelector(".top-scorer").classList.toggle("full-screen");
document.querySelector("footer").classList.toggle("full-screen");
document.querySelector(".card").classList.toggle("f-g-m");
});
