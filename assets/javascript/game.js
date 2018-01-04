var audio = new Audio('Music/Urf.mp3');
audio.volume = .1;
audio.play();
let answerList = ["jhin","kindred"];

function Game(){
	this.randomNumber = Math.floor(Math.random()*answerList.length);
	this.answerRandom = answerList[this.randomNumber];
	this.answerFinal = this.answerRandom.split("");
	this.answerBlank = [this.answerRandom.length];
	for(i=0;i<this.answerRandom.length;i++){
		this.answerBlank[i]=("_");
	}
	this.answerString = this.answerBlank.join("");
}

var newGame = new Game();
$( ".result_text" ).html(newGame.answerString);

function isGameOver(){
	if(newGame.answerString.indexOf("_")==-1){
		return true;
	}
	return false;
}

function playMusic(){
	audio.pause();
	if(newGame.randomNumber==0){
		audio = new Audio('Music/JHIN.mp3');
	}
	else{
		audio = new Audio('Music/KIND.mp3');
	}
	audio.volume = .1;
	audio.play();
}

document.onkeyup = function(event){
	var guess = String.fromCharCode(event.keyCode).toLowerCase();
	console.log(guess);
	if(newGame.answerRandom.indexOf(guess)!=-1){
		console.log(`The word contains ${guess}`);
		for(i=0;i<newGame.answerBlank.length;i++){
			if(newGame.answerFinal[i]==guess){
				newGame.answerBlank[i]=guess;
			}
		}
		newGame.answerString=newGame.answerBlank.join("");
		console.log(newGame.answerString);
		$( ".result_text" ).html(newGame.answerString);
		if(isGameOver()){
			playMusic();
			answerList.splice(newGame.randomNumber,newGame.randomNumber+1);
			newGame = new Game();
		}
	}	
	else{
		console.log(`The word does not contain ${guess}`);
	}
}