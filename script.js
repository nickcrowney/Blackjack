// things to fix: display all cards, 5 card trick, A high or low

const suits = ["♠", "♥", "♣", "♦"];//["S", "H", "C", "D"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];
let updateDeck = [];
let money = 0;
let bet = document.getElementById("enterBet").value;
let weight = 0;
let playerName = "";
// let ad = "";
let nameEntered = false;
let x=0;
let y=0;
let game="";
document.getElementById("status1").style.display="none";
document.getElementById("enterBet").style.display = "none";
document.getElementById("start-btn").style.display = "none";
document.getElementById("betText").style.display = "none";
document.getElementById("changePlayer").style.display = "none";
document.getElementById("betDoneText").style.display="none";
document.getElementById("betDoneNumber").style.display="none";
document.getElementById("dollarBet").style.display="none";
// function checkMoney() {
//     if (player.moneyLeft<player.betAmount) {
//        return document.getElementById("status").innerHTML = "You're out of cash! Come back with more money!"; 
// } else {}
    
// }
function inputPlayer() { 
    player.moneyLeft=30;
    if (document.getElementById("inputName").value !== "") { 
    nameEntered=true;}
    else {
    return document.getElementById("status").innerHTML="In lieu of a valid ID, your name is required to enter the casino";
}
    document.getElementById("playerName").innerHTML=document.getElementById("inputName").value;
    document.getElementById("inputName").style.display="none";
    document.getElementById("inputPlayer").style.display="none";
   
    document.getElementById("changePlayer").style.display ="";
    playerName=document.getElementById("playerName").innerHTML;
    document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
    player.name= playerName;
    document.getElementById("enterBet").style.display = "";
    document.getElementById("start-btn").style.display = "";
    document.getElementById("betText").style.display = "";
    document.getElementById("changePlayer").style.display ="none";
    document.getElementById("status").style.display = "none";
} 

function changePlayer() {
    if (document.getElementById("inputName").value != "") {
        let x=0;
        let y=0;
        player.moneyLeft = 30;
    document.getElementById("playerPoints").innerHTML="";
    document.getElementById("bankerPoints").innerHTML="";

    document.getElementById("enterBet").style.display = "none";
    document.getElementById("status").style.display="none";
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("betText").style.display = "none";
    document.getElementById("inputName").style.display="";
    document.getElementById("inputPlayer").style.display="";
    document.getElementById("changePlayer").style.display ="none";
    document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
    player.name= playerName;
} else {
    return document.getElementById("status").innerHTML="In lieu of a valid ID, your name is required to enter the casino";
}
    // document.getElementById("enterBet").style.display = "";
    // document.getElementById("start-btn").style.display = "";
    // document.getElementById("betText").style.display = "";
}
console.log(playerName);
let player = {
    name: "",
    betAmount: 0,
    moneyLeft: money,
    hand: [],
    points: 0
};

let banker = {
    _name: "Banker",
    moneyLeft: 9999,
    hand: [],
    points: 0
};
document.getElementById("moneyLeft").innerHTML = player.moneyLeft;

// function getName()
// {
//     ad= document.getElementById("username").value;
//     //    playerName = document.getElementById("username").value;
// //alert(ad);
// }
// // playerName=ad;
// // playerName=document.querySelector("#username");
// console.log(playerName);
//let nam = document.getElementById('playerName');
//console.log(nam)
function createDeck () {
for (i=0; i<suits.length; i++) {
    for (j=0; j<values.length; j++) {
        weight = parseInt(values[j]);
        if (values[j]== "J" | values[j]== "Q" | values[j] == "K") {
            weight = 10;
        } else if (values[j]== "A") {
            weight = 11;
        }
        let card = {suits: suits[i], values: values[j], weight: weight};
        deck.push(card);
    }
} return deck;
}

function shuffleDeck () {
    for (var i=0; i<1000; i++) {
        let pos1 = Math.floor(Math.random()*deck.length);
        let pos2 = Math.floor(Math.random()*deck.length);
        let posTemp = deck[pos1];
        deck[pos1] = deck[pos2];
        deck[pos2] = posTemp;
    } return deck;
}
//shuffleDeck()
//console.log(createDeck())
//console.log(shuffleDeck())
//console.log(Math.floor(Math.random()*52))
//document.getElementById("playerName")
// function enterName() {
//     playerName=document.getElementById("playerName");
// }



function bust() {//{window.alert("BUST!");
//console.log("BUST!");
document.getElementById("status").innerHTML="BUST!";
document.getElementById("hit-btn").disabled=true;
document.getElementById("stay-btn").disabled=true;
player.moneyLeft -= player.betAmount;
document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
document.getElementById("start-btn").style.display = "";
document.getElementById("enterBet").style.display = "";
document.getElementById("betText").style.display = "";
checkCash();
return game ="bust";
}
win = () => {
    document.getElementById("status").innerHTML="You win!";
document.getElementById("hit-btn").disabled=true;
document.getElementById("stay-btn").disabled=true;
player.moneyLeft += player.betAmount;
document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
document.getElementById("start-btn").style.display = "";
document.getElementById("enterBet").style.display = "";
document.getElementById("betText").style.display = "";
checkCash();
return game = "win";
};

function lose() {//{window.alert("BUST!");
    //console.log("BUST!");
    document.getElementById("status").innerHTML="You lose!";
    document.getElementById("hit-btn").disabled=true;
    document.getElementById("stay-btn").disabled=true;
    player.moneyLeft -= player.betAmount;
    document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
    document.getElementById("start-btn").style.display = "";
    document.getElementById("enterBet").style.display = "";
    document.getElementById("betText").style.display = "";
    checkCash();
    return game = "lose";
    }

    function draw() {
        document.getElementById("status").innerHTML="Draw";
        document.getElementById("hit-btn").disabled=true;
        document.getElementById("stay-btn").disabled=true;
        document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
        document.getElementById("start-btn").style.display = "";
        document.getElementById("enterBet").style.display = "";
        document.getElementById("betText").style.display = ""; 
    }
checkCash = () => {
    if (player.moneyLeft<1) {
       let rand = Math.floor(Math.random()*3);
       let endArray = ["You're out of cash. <br>Try selling some possessions for the chance to win big!", "It's a shame we took all of your money. <br>Beg your friends for more, come back and be a success!", "No cash? No play."];
        return document.getElementById("status").innerHTML = endArray[rand];
       }
       else {}
};

check = () => {
    if (banker.points==21&&player.points>21) {
        document.getElementById("status").innerHTML="Dealer has Blackjack!";
        lose();
    }   else if (player.points>21) {
        // if (player.hand[0].weight==11) {
        //     return player.points -=10;
        // } 
        // if (player.hand[1].weight==11) {
        //     return player.points -=10; 
        // }
        // if (player.hand[2].weight==11) {
        //     return player.points -=10;
        // }
        // if   (player.hand[3].weight==11) {
        //     return player.points -=10;    
        //     }
        // if (player.hand[4].weight==11){
        //     return player.points -=10; 
        // }
        //  else 
         bust();
    } else if (player.points==21 && banker.points>21) {
        document.getElementById("status").innerHTML="You have Blackjack!";
        win();
    }  else if (banker.points== 21 && player.points ==21) {
        document.getElementById("status").innerHTML="Both have Blackjack, dealer wins!";
        lose();
    } else if (banker.points>21) {
        document.getElementById("status").innerHTML="Dealer is bust!";
        win();
    }  else if (x>=4) {
        document.getElementById("status1").style.display="";
        document.getElementById("status1").innerHTML="Five card trick!";
        win();
    } else if (y>=4) {
        document.getElementById("status1").style.display="";
        document.getElementById("status1").innerHTML="Five card trick!";
        lose();
    } else {return;}
};

function checkStay() {
    if (player.points<banker.points && banker.points<22) {
        lose();
    }
    else if (player.points==banker.points && player.points>16) {
        draw();
    } else {
        return;
    }
};
/*function shuffleIt() {
    document.getElementById('btnStart') = shuffleDeck();
}*/

function dealPlayer() {
    let card = deck.pop();
    player.hand.push(card);
    player.points += card.weight;
}

function dealBanker() {
    let card = deck.pop();
    banker.hand.push(card);
    banker.points += card.weight;
}

function newGame() {
        if (isNaN(parseInt(document.getElementById("enterBet").value))) {
            document.getElementById("status").style.display="";
              return document.getElementById("status").innerHTML= "Enter your bet amount to play";
              //document.getElementById("enterBet").value = "";
        } else if (parseInt(document.getElementById("enterBet").value)==0){
            document.getElementById("status").style.display="";
        return document.getElementById("status").innerHTML= "Don't be cheap.";
        } else if ((parseInt(document.getElementById("enterBet").value)<0)){
            document.getElementById("status").style.display="";
            return document.getElementById("status").innerHTML= "Betting against yourself? Pathetic.";
        }     else {
    player.betAmount = parseInt(document.getElementById("enterBet").value);
   document.getElementById("status").style.display = "";
   if (player.moneyLeft<player.betAmount) {
    let rand = Math.floor(Math.random()*3); 
    let betArray =["Looks like you don't have enough cash! <br>Come back with more money or bet lower!", "Woah big spender, maybe try an amount you can actually afford","Little advice, don't try to make bets your wallet can't handle"];
    return document.getElementById("status").innerHTML = betArray[rand]; 
} else {
    x=0;
    y=0;
    player.points = 0;
    banker.points = 0;  
    player.hand = [];
    banker.hand = []; 
    document.getElementById("status1").style.display="none";
    document.getElementById("enterBet").style.display = "none";
    document.getElementById("start-btn").style.display = "none";
    document.getElementById("betText").style.display = "none";
    document.getElementById("changePlayer").style.display ="";
    document.getElementById("status").innerHTML="";
    document.getElementById("hit-btn").disabled=false;
    document.getElementById("stay-btn").disabled=false;
    document.getElementById("betDoneText").style.display="";
    document.getElementById("betDoneNumber").style.display="";
    document.getElementById("dollarBet").style.display="";
    document.getElementById("betDoneNumber").innerHTML=document.getElementById("enterBet").value;
    document.getElementById("yourCard1").innerHTML ="";
    document.getElementById("yourCard2").innerHTML ="";
    document.getElementById("yourCard3").innerHTML ="";
    document.getElementById("yourCard4").innerHTML ="";
    document.getElementById("bankerCard1").innerHTML ="";
    document.getElementById("bankerCard2").innerHTML ="";
    document.getElementById("bankerCard3").innerHTML ="";
    document.getElementById("bankerCard4").innerHTML ="";

createDeck();
shuffleDeck();
dealPlayer();
console.log(player);
document.getElementById("yourCard").innerHTML = (JSON.stringify(player.hand[0].values)+JSON.stringify(player.hand[0].suits)).replace(/\"/g, "");
document.getElementById("playerPoints").innerHTML = player.points;
dealPlayer();
document.getElementById("yourCard1").innerHTML = (JSON.stringify(player.hand[1].values)+JSON.stringify(player.hand[1].suits)).replace(/\"/g, "");
document.getElementById("playerPoints").innerHTML = player.points;
dealBanker();
document.getElementById("bankerCard").innerHTML = (JSON.stringify(banker.hand[0].values)+JSON.stringify(banker.hand[0].suits)).replace(/\"/g, "");
document.getElementById("bankerPoints").innerHTML = banker.points;
dealBanker();
document.getElementById("bankerCard1").innerHTML = (JSON.stringify(banker.hand[1].values)+JSON.stringify(banker.hand[1].suits)).replace(/\"/g, "");
document.getElementById("bankerPoints").innerHTML = banker.points;
console.log("y"+y);
console.log("x"+x);
console.log(banker.points);
console.log(player.hand[0].weight);
x+=2;
y+=2;
check()
}}

}

//document.getElementById("playerName").innerHTML = playerName;
// document.getElementById("playerCard").innerHTML = JSON.stringify(player.hand[x].values)+JSON.stringify(player.hand[x].suits);
// document.getElementById("playerPoints").innerHTML = player.points;
// document.getElementById("bankerCard").innerHTML = JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits);
// document.getElementById("bankerPoints").innerHTML = banker.points;
function hit() {{
    check();
    dealPlayer();
    if (x==2) {document.getElementById("yourCard2").innerHTML =("    "+JSON.stringify(player.hand[x].values)+JSON.stringify(player.hand[x].suits)+"     ").replace(/\"/g, "");
} else if (x==3) {document.getElementById("yourCard3").innerHTML = ("    "+JSON.stringify(player.hand[x].values)+JSON.stringify(player.hand[x].suits)+"     ").replace(/\"/g, "");
} else if (x==4) {document.getElementById("yourCard4").innerHTML = ("    "+JSON.stringify(player.hand[x].values)+JSON.stringify(player.hand[x].suits)+"     ").replace(/\"/g, "");
} 
    document.getElementById("playerPoints").innerHTML = player.points;

    check();
    dealBanker();
    if (y==2) {document.getElementById("bankerCard2").innerHTML = ("     "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, "");
} else if (y==3) {document.getElementById("bankerCard3").innerHTML = ("     "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, "");
} else if (y==4) {document.getElementById("bankerCard4").innerHTML = ("     "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, "");
}   
    //document.getElementById("bankerCard1").innerHTML = (JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)).replace(/\"/g, "");
    document.getElementById("bankerPoints").innerHTML = banker.points;
    y+=1;
    x+=1;}
    console.log("y"+y);
    console.log("x"+x);
    console.log(banker);
    console.log(banker.points);
    check();
    if (game == "win") {
        return;
    } else {}
}
function stay() {{
    checkStay();
    if (game == "lose") {
         return;
    } else if (game == "draw") {
        return;
    }
    else {
    //check();
    dealBanker();
    if (y==2) {document.getElementById("bankerCard2").innerHTML = ("     "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, "");
} else if (y==3) {document.getElementById("bankerCard3").innerHTML = ("     "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, "");
} else if (y==4) {document.getElementById("bankerCard4").innerHTML = ("     "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, "");
} 
//    document.getElementById("bankerCard").innerHTML = JSON.stringify(banker.hand[0].values)+JSON.stringify(banker.hand[y].suits);
    document.getElementById("playerPoints").innerHTML = player.points;
    document.getElementById("bankerPoints").innerHTML = banker.points;     
check();
y+=1;
}
console.log(banker);
console.log("y"+y);
console.log("x"+x);
console.log(player.points);
console.log(banker.points);
}
}



// console.log(deck);
// startGame();
// console.log(player);
// console.log(deck);
// console.log(banker);
// dealBanker();
// dealPlayer();
// console.log(player);
// console.log(banker);
// console.log(deck);
// console.log(player.hand[1]);