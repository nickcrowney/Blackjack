const suits = ["♠", "♥", "♣", "♦"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];
let updateDeck = [];
let bet = document.getElementById("enterBet").value;
let weight = 0;
let playerName = "";
let x=0;
let y=0;
let a=0;

//initial conditions
document.getElementById("status").innerHTML="Enter Player Name";
document.getElementById("doubleDown").style.display="none";
document.getElementById("enterBet").style.display="none";
document.getElementById("start-btn").style.display="none";
document.getElementById("betText").style.display="none";
document.getElementById("changePlayer").style.display="none";
document.getElementById("betDoneText").style.visibility="hidden";
document.getElementById("betDoneNumber").style.visibility="hidden";
document.getElementById("dollarBet").style.visibility="hidden";
document.getElementById("nameInvite").style.display="none";
document.getElementById("hit-btn").style.visibility="hidden";
document.getElementById("stay-btn").style.visibility="hidden"; 

function inputPlayer() { 
    player.moneyLeft=100;
    if (document.getElementById("inputName").value == "") {return document.getElementById("status").innerHTML="In lieu of a valid ID, your name is required to enter the casino";
}    else {    
    document.getElementById("nameInvite").style.display="none";
    document.getElementById("playerName").innerHTML=document.getElementById("inputName").value;
    document.getElementById("inputName").style.display="none";
    document.getElementById("inputPlayer").style.display="none";
    document.getElementById("changePlayer").style.display ="";
    playerName=document.getElementById("playerName").innerHTML;
    document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
    player.name= playerName;
    document.getElementById("enterBet").style.display="";
    document.getElementById("start-btn").style.display="";
    document.getElementById("betText").style.display="";
    document.getElementById("status").style.visibility="visible";
    document.getElementById("status").innerHTML="How much are you going to bet?";
} 
}

function changePlayer() {
    document.getElementById("nameInvite").style.display="";
    document.getElementById("playerName").style.visibility ="hidden";
    if (document.getElementById("inputName").value != "") {
        let x=0;
        let y=0;
        player.moneyLeft = 100;
    document.getElementById("playerPoints").innerHTML="";
    document.getElementById("bankerPoints").innerHTML="";
    document.getElementById("enterBet").style.display="none";  
    document.getElementById("betText").style.display="none";
    document.getElementById("start-btn").style.display="none";
    document.getElementById("status").style.visibility ="hidden";
    document.getElementById("inputName").style.display ="";
    document.getElementById("inputPlayer").style.display ="";
    document.getElementById("changePlayer").style.display ="none";
    document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
    player.name= playerName;
    document.getElementById("playerName").style.visibility ="visible";
} else {
    return document.getElementById("status").innerHTML="In lieu of a valid ID, your name is required to enter the casino";
}
}
//console.log(playerName);
let player = {
    name: "",
    moneyLeft: 0,
    hand: [],
    points: 0,
    betAmount: 0
};

let banker = {
    _name: "Banker",
//    moneyLeft: 9999,
    hand: [],
    points: 0
};

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

function bust() {
player.moneyLeft -= player.betAmount;
document.getElementById("status").innerHTML=`You're bust! You lose $${player.betAmount}!`;
document.getElementById("hit-btn").style.visibility="hidden";
document.getElementById("stay-btn").style.visibility="hidden";
document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
document.getElementById("start-btn").style.display="";
document.getElementById("enterBet").style.display="";
document.getElementById("betText").style.display="";
checkCash();
return "Bust";
}
win = () => {
player.moneyLeft += player.betAmount;
document.getElementById("status").innerHTML=`You win $${player.betAmount}!`;
document.getElementById("hit-btn").style.visibility="hidden";
document.getElementById("stay-btn").style.visibility="hidden";
document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
document.getElementById("start-btn").style.display="";
document.getElementById("enterBet").style.display="";
document.getElementById("betText").style.display="";
document.getElementById("betDoneText").style.display ="none";
document.getElementById("betDoneNumber").style.display ="none";
document.getElementById("dollarBet").style.display ="none";
checkCash();
return "Win";
};

function lose() {
    player.moneyLeft -= player.betAmount;
    document.getElementById("status").innerHTML=`You lose $${player.betAmount}!`;
    document.getElementById("hit-btn").style.visibility="hidden";
    document.getElementById("stay-btn").style.visibility="hidden";
    document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
    document.getElementById("start-btn").style.display="";
    document.getElementById("enterBet").style.display="";
    document.getElementById("betText").style.display="";
    document.getElementById("betDoneText").style.display ="none";
    document.getElementById("betDoneNumber").style.display ="none";
    document.getElementById("dollarBet").style.display ="none";
    checkCash();
    return "Lose";
    }

function draw() {
        document.getElementById("status").innerHTML="Draw";
        document.getElementById("hit-btn").style.visibility="hidden";
        document.getElementById("stay-btn").style.visibility="hidden";
        document.getElementById("moneyLeft").innerHTML = player.moneyLeft;
        document.getElementById("start-btn").style.display="";
        document.getElementById("enterBet").style.display="";
        document.getElementById("betText").style.display="";
        document.getElementById("betDoneText").style.display ="none";
        document.getElementById("betDoneNumber").style.display ="none";
        document.getElementById("dollarBet").style.display ="none";
        document.getElementById("bankerCard1").innerHTML = (JSON.stringify(banker.hand[1].values)+JSON.stringify(banker.hand[1].suits)).replace(/\"/g, "");
        document.getElementById("bankerPoints").innerHTML = banker.points;
        return "draw";
    }
checkCash = () => {
    if (player.moneyLeft==0) {
       let rand = Math.floor(Math.random()*3);
       let endArray = ["You're out of cash. <br>Try selling some possessions for the chance to win big!", 
       "It's a shame we took all of your money. <br>Beg your friends for more, come back and be a success!", 
       "No cash? No play."];
        return document.getElementById("status").innerHTML = endArray[rand];
       }
       else {}
};

check = () => {
            if (player.points>21) {
                bust();
                document.getElementById("status").innerHTML=`You're bust! Lose $${player.betAmount}!`;
                document.getElementById("bankerCard1").innerHTML = (JSON.stringify(banker.hand[1].values)+JSON.stringify(banker.hand[1].suits)).replace(/\"/g, "");
                document.getElementById("bankerPoints").innerHTML = banker.points;
            }   
        
            else if (banker.points>21) {
                win();
        document.getElementById("status").style.visibility ="visible";
        document.getElementById("status").innerHTML=`Dealer's bust! You win $${player.betAmount}!`;
            } else if (banker.points== 21 && player.points ==21) {
    document.getElementById("status").style.visibility ="visible";
    document.getElementById("status").innerHTML=`You're both on 21! Dealer's advantage. Lose $${player.betAmount}!`;
        lose();
    } else if (player.points==21) {
    document.getElementById("status").style.visibility ="visible";
    win();
    document.getElementById("status").innerHTML=`You got Blackjack! You win $${player.betAmount}!`;
    
    }        else if (x>=4) {
        document.getElementById("status").style.visibility ="visible";
        win();
        document.getElementById("status").innerHTML=`Five card trick! Win $${player.betAmount}!`;
        
    } else if (y>=4) {
        document.getElementById("status").style.visibility ="visible";
        lose();
        document.getElementById("status").innerHTML=`Dealer has a five card trick! Lose $${player.betAmount}!`;
       
    } else {}
};

checkStay = () => {
    if (y==4 && banker.points<22) {
        document.getElementById("status").style.visibility ="visible";
        lose();
        document.getElementById("status").innerHTML=`Dealer got a five card trick! Lose $${player.betAmount}!`;
    } else if (banker.points== 21) {
    document.getElementById("status").style.visibility ="visible";
    lose();
    document.getElementById("status").innerHTML=`Dealer got Blackjack! You lose $${player.betAmount}!`;
    }
    else if (player.points<banker.points && banker.points<22) {
        lose();
    }
    else if ((banker.points==player.points) && (player.points<21)) {
        document.getElementById("status").style.visibility ="visible";
        draw();
        document.getElementById("status").innerHTML=`Draw!`;
        
    } else if (banker.points>21) {
        win();
document.getElementById("status").style.visibility ="visible";
document.getElementById("status").innerHTML=`Dealer's bust! You win $${player.betAmount}!`;}
else {
        return;
    }
};

function doubleDown() {
    player.betAmount *=2;
    document.getElementById("doubleDown").style.display ="none";
    document.getElementById("betDoneNumber").innerHTML = player.betAmount; 
}

function dealPlayer() {
    let card = deck.pop();
    player.hand.push(card);
    
    a=0;
    for (var b=0; b<player.hand.length; b++) {
    a+=player.hand[b].weight;
}
player.points=a;
    for (var z=0; z<player.hand.length; z++) {
        if (player.points>21) {
            if (player.hand[z].weight==11) {
            player.hand[z].weight=1;
        } else {
        }
    }}

    a=0;
    for (var b=0; b<player.hand.length; b++) {
    a+=player.hand[b].weight;
    
}player.points=a;
    return ;
}

function dealBanker() {
    let card = deck.pop();
    banker.hand.push(card);
    a=0;
    for (var b=0; b<banker.hand.length; b++) {  
    a+=banker.hand[b].weight;}
    banker.points=a;
    for (var w=0; w<banker.hand.length; w++) {
        if (banker.points>21) {
            if (banker.hand[w].weight==11) {
            banker.hand[w].weight=1;
        } else {
        } }} 

        a=0;
        for (var b=0; b<banker.hand.length; b++) {  
        a+=banker.hand[b].weight;

        }
        banker.points=a;
        return ;
}

function newGame() { //accept bet, deal two cards to each player, 2nd of dealer's being hidden
         if (isNaN(parseFloat(document.getElementById("enterBet").value))) {
            document.getElementById("status").style.visibility ="visible";
              return document.getElementById("status").innerHTML= "Enter your bet amount to play";
              //document.getElementById("enterBet").value = "";
        } else if (parseFloat(document.getElementById("enterBet").value)==0){
            document.getElementById("status").style.visibility ="visible";
        return document.getElementById("status").innerHTML= "Don't be cheap.";
        } else if ((parseFloat(document.getElementById("enterBet").value)<0)){
            document.getElementById("status").style.visibility ="visible";
            return document.getElementById("status").innerHTML= "Betting against yourself? Pathetic.";
        }     else {
    player.betAmount = parseFloat(document.getElementById("enterBet").value);
   document.getElementById("status").style.visibility ="visible";
        }
   if (player.moneyLeft<player.betAmount) {
    let rand = Math.floor(Math.random()*3); 
    let betArray =["Looks like you don't have enough cash! <br>Come back with more money or bet lower!", 
                    "Woah big spender, maybe try an amount you can actually afford",
                    "Little advice, don't try to make bets your wallet can't handle"];
    return document.getElementById("status").innerHTML = betArray[rand]; 
} else if (player.moneyLeft>200) {
        document.getElementById("hit-btn").disabled=true;
        document.getElementById("stay-btn").disabled=true;
        return document.getElementById("status").innerHTML ="Ok you've won enough already... you must be counting cards.<br>Get out of here!";   
}
else { //bet accepted
    x=0;
    y=0;
    player.points = 0;
    banker.points = 0;  
    player.hand = [];
    banker.hand = [];
    document.getElementById("status").style.visibility ="visible"; 
    document.getElementById("status").innerHTML="Cards dealt. Hit or Stand?";
    document.getElementById("hit-btn").style.visibility="visible";
    document.getElementById("stay-btn").style.visibility="visible";
    document.getElementById("enterBet").style.display="none";
    document.getElementById("start-btn").style.display="none";
    document.getElementById("betText").style.display="none";
    document.getElementById("hit-btn").disabled=false;
    document.getElementById("stay-btn").disabled=false;
    document.getElementById("betDoneText").style.visibility="visible";
    document.getElementById("betDoneNumber").style.visibility="visible";
    document.getElementById("dollarBet").style.visibility="visible";
    document.getElementById("betDoneText").style.display ="";
    document.getElementById("betDoneNumber").style.display ="";
    document.getElementById("dollarBet").style.display ="";
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
document.getElementById("yourCard").innerHTML = (JSON.stringify(player.hand[0].values)+JSON.stringify(player.hand[0].suits)).replace(/\"/g, "");
document.getElementById("playerPoints").innerHTML = player.points;
x+=1;
dealPlayer();
document.getElementById("yourCard1").innerHTML = (JSON.stringify(player.hand[1].values)+JSON.stringify(player.hand[1].suits)).replace(/\"/g, "");
document.getElementById("playerPoints").innerHTML = player.points;

dealBanker();
document.getElementById("bankerCard").innerHTML = (JSON.stringify(banker.hand[0].values)+JSON.stringify(banker.hand[0].suits)).replace(/\"/g, "");
document.getElementById("bankerPoints").innerHTML = banker.points;
y+=1;
dealBanker();
document.getElementById("bankerCard1").innerHTML = "?";    
document.getElementById("bankerPoints").innerHTML = "?";
y+=1;
console.log(player);
console.log(banker);

if (player.points==21 && banker.points==21) {
    draw();
    document.getElementById("status").innerHTML=`You and the dealer both got blackjack, draw.`;
}
else if (player.points==21) {
    win();
    document.getElementById("status").innerHTML=`You got Blackjack! Win $${player.betAmount}!`;
} else if (player.points>21) {
    player.hand[0].weight = 1;
    document.getElementById("doubleDown").style.display ="none";
} else {
    document.getElementById("doubleDown").style.display ="";
}
if (banker.points>21) {
    banker.hand[0].weight = 1;
}
}
document.getElementById("playerPoints").innerHTML = player.points;
console.log(player);
console.log(banker);
}
function hit() {{
    document.getElementById("doubleDown").style.display ="none";
    dealPlayer();  
    x=x+1;
    check();
    if (x==2) {document.getElementById("yourCard2").innerHTML =("    "+JSON.stringify(player.hand[x].values)+JSON.stringify(player.hand[x].suits)+"     ").replace(/\"/g, "");
} else if (x==3) {document.getElementById("yourCard3").innerHTML = ("    "+JSON.stringify(player.hand[x].values)+JSON.stringify(player.hand[x].suits)+"     ").replace(/\"/g, "");
} else if (x==4) {document.getElementById("yourCard4").innerHTML = ("    "+JSON.stringify(player.hand[x].values)+JSON.stringify(player.hand[x].suits)+"     ").replace(/\"/g, "");
} 
    document.getElementById("playerPoints").innerHTML = player.points;
    }
    console.log("y"+y);
    console.log("x"+x);
    console.log(banker);
    console.log(player);
}
function stay() {
    document.getElementById("hit-btn").disabled=true;
    document.getElementById("stay-btn").disabled=true;
    document.getElementById("doubleDown").style.display ="none";
    document.getElementById("bankerCard1").innerHTML = (JSON.stringify(banker.hand[1].values)+JSON.stringify(banker.hand[1].suits)).replace(/\"/g, "");
    document.getElementById("bankerPoints").innerHTML = banker.points;

    if (banker.points==21) {
        lose();  
        document.getElementById("status").style.visibility ="visible";
        document.getElementById("status").innerHTML=`Dealer got Blackjack! You lose $${player.betAmount}!`;
        document.getElementById("bankerPoints").innerHTML = banker.points;
        
    }
    else if (banker.points>player.points&&banker.points<22) {
        document.getElementById("status").style.visibility ="visible";
        lose();
        document.getElementById("status").innerHTML=`You lose $${player.betAmount}!`;
        document.getElementById("bankerPoints").innerHTML = banker.points;
        
    } else if (banker.points==player.points&&banker.points>16){
        document.getElementById("status").style.visibility ="visible";
        draw();
        document.getElementById("status").innerHTML="Draw";
        document.getElementById("bankerPoints").innerHTML = banker.points;
        
    }
    else {
    dealBanker();
    
    document.getElementById("bankerCard2").innerHTML =("    "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, "");
    checkStay();  
    y+=1;
    if (banker.points==21) {
        document.getElementById("status").style.visibility ="visible";
        lose(); 
        document.getElementById("status").innerHTML=`Dealer got Blackjack! You lose $${player.betAmount}!`;
        document.getElementById("bankerPoints").innerHTML = banker.points;
         
    }
    else if (banker.points<player.points) {
        document.getElementById("status").style.visibility ="visible";
        dealBanker();
        document.getElementById("bankerCard3").innerHTML = ("   "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, "");
        
        document.getElementById("bankerPoints").innerHTML = banker.points;

        checkStay();
        y+=1;
    } else if (banker.points==player.points&&banker.points>15){
        draw();
        document.getElementById("bankerPoints").innerHTML = banker.points;
        document.getElementById("status").style.visibility ="visible";
        document.getElementById("status").innerHTML="Draw"; 
        
    } else {}
        if (banker.points<player.points) {
        document.getElementById("status").style.visibility ="visible";
        dealBanker();
        document.getElementById("bankerCard4").innerHTML = ("    "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, "");
        checkStay();
        document.getElementById("bankerPoints").innerHTML = banker.points;
    } else if (banker.points==player.points&&banker.points>15){
        draw();
        document.getElementById("status").style.visibility ="visible";
        document.getElementById("status").innerHTML="Draw";
    } else {
    } 
}
    document.getElementById("playerPoints").innerHTML = player.points;
    document.getElementById("bankerPoints").innerHTML = banker.points;     
document.getElementById("bankerPoints").innerHTML = banker.points; 
console.log("y"+y);
console.log("x"+x);
console.log(banker);
console.log(player);
}
