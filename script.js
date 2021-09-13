const suits = ["♠", "♥", "♣", "♦"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = [];
let updateDeck = [];
let weight = 0;
let playerName = "";
let x=0;
let y=0;
let a=0;
let newCard = "";

$(document).ready(() => {
//initial conditions
$("#status").html("Enter Player Name");
$("#doubleDown").hide();
$("#enterBet").hide();
$("#start-btn").hide();
$("#betText").hide();
$("#changePlayer").hide();
$("#betDoneText").css('visibility', 'hidden');
$("#betDoneNumber").css('visibility', 'hidden');
$("#dollarBet").css('visibility', 'hidden');
$("#hit-btn").css('visibility', 'hidden');
$("#stay-btn").css('visibility', 'hidden');

$('.bottom-btns').children().on('mouseover', event => {
    $(event.currentTarget).addClass('active');
// * I was going to animate the buttons to become more enlarged while mouse hovers over them but decided not to overly complicate things due to layout issues.
//     $(event.currentTarget).animate( {
//     padding: '30px'
//   }, 500);
}).on('mouseleave', event => {
    $(event.currentTarget).removeClass('active');
    //   $(event.currentTarget).animate( {
    //      padding: '20px'
    //   },200);
    }).on('click', event => {
        $(event.currentTarget).removeClass('active');
        //   $(event.currentTarget).animate( {
        //      padding: '20px'}, 200);
            });

$('#inputPlayer').on('click', () => {
    player.moneyLeft=100;
    if ($("#inputName").val() == "") {return $("#status").html("In lieu of a valid ID, your name is required to enter the casino");
}    else {    
    $("#playerName").html($("#inputName").val());
    $("#inputName").hide();
    $("#inputPlayer").hide();
    $("#changePlayer").show();
    playerName=$("playerName").html();
    $("#moneyLeft").html(player.moneyLeft);
    player.name= playerName;
    $("#enterBet").show();
    $("#start-btn").show();
    $("#betText").show();
    $("#status").css('visibility', 'visible');
    $("#status").html("How much are you going to bet?");
}});

$('#changePlayer').on('click', () => {
    $("#hit-btn").css('visibility', 'hidden');
    $("#stay-btn").css('visibility', 'hidden');
    $("#doubleDown").hide();
    $("#betDoneText").hide();
    $("#betDoneNumber").hide();
    $("#dollarBet").hide();
    $("#playerName").css('visibility', 'hidden');
    if ($("#inputName").val() != "") {
        let x=0;
        let y=0;
        player.moneyLeft = 100;
    $("#playerPoints").html(" ");
    $("#bankerPoints").html(" ");
    $("#bankerCard").hide();
    $("#bankerCard1").hide();
    $("#bankerCard2").hide();
    $("#bankerCard3").hide();
    $("#bankerCard4").hide();
    $("#yourCard").hide();
    $("#yourCard1").hide();
    $("#yourCard2").hide();
    $("#yourCard3").hide();
    $("#yourCard4").hide();
    $("#enterBet").hide(); 
    $("#betText").hide();
    $("#start-btn").hide();
    $("#status").css('visibility', 'visible');
    $("#status").html("Enter Player Name");
    $("#inputName").show();
    $("#inputPlayer").show();
    $("#changePlayer").hide();
    $("#moneyLeft").html(player.moneyLeft);
    player.name= playerName;
    $("#playerName").css('visibility', 'visible');
} else {
    return $("#status").html("In lieu of a valid ID, your name is required to enter the casino");
}
});
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
$("#status").html(`You're bust! You lose $${player.betAmount}!`);
$("#hit-btn").css('visibility', 'hidden');
$("#stay-btn").css('visibility', 'hidden');
$("#moneyLeft").html(player.moneyLeft);
$("#start-btn").show();
$("#enterBet").show();
$("#betText").show();
checkCash();
return "Bust";
}
win = () => {
player.moneyLeft += player.betAmount;
$("#status").html(`You win $${player.betAmount}!`);
$("#hit-btn").css('visibility', 'hidden');
$("#stay-btn").css('visibility', 'hidden');
$("#moneyLeft").html(player.moneyLeft);
$("#start-btn").show();
$("#enterBet").show();
$("#betText").show();
$("#betDoneText").hide();
$("#betDoneNumber").hide();
$("#dollarBet").hide();
checkCash();
return "Win";
};

function lose() {
    player.moneyLeft -= player.betAmount;
    $("#status").html(`You lose $${player.betAmount}!`);
    $("#hit-btn").css('visibility', 'hidden');
    $("#stay-btn").css('visibility', 'hidden');
    $("#moneyLeft").html(player.moneyLeft);
    $("#start-btn").show();
    $("#enterBet").show();
    $("#betText").show();
    $("#betDoneText").hide();
    $("#betDoneNumber").hide();
    $("#dollarBet").hide();
    checkCash();
    return "Lose";
    }

function draw() {
        $("#status").html("Draw");
        $("#hit-btn").css('visibility', 'hidden');
        $("#stay-btn").css('visibility', 'hidden');
        $("#moneyLeft").html(player.moneyLeft);
        $("#start-btn").show();
        $("#enterBet").show();
        $("#betText").show();
        $("#betDoneText").hide();
        $("#betDoneNumber").hide();
        $("#dollarBet").hide();
        $("#bankerCard1").html((JSON.stringify(banker.hand[1].values)+JSON.stringify(banker.hand[1].suits)).replace(/\"/g, ""));
        $("#bankerPoints").html(banker.points);
        return "draw";
    }
checkCash = () => {
    if (player.moneyLeft==0) {
       let rand = Math.floor(Math.random()*3);
       let endArray = ["You're out of cash. <br>Try selling some possessions for the chance to win big!", 
       "It's a shame we took all of your money. <br>Beg your friends for more, come back and be a success!", 
       "No cash? No play."];
        return $("#status").html(endArray[rand]);
       }
       else {}
};

check = () => {
            if (player.points>21) {
                bust();
                $("#status").html(`You're bust! Lose $${player.betAmount}!`);
                $("#bankerCard1").html((JSON.stringify(banker.hand[1].values)+JSON.stringify(banker.hand[1].suits)).replace(/\"/g, ""));
                $("#bankerPoints").html(banker.points);
            }   
            else if (banker.points>21) {
                win();
        $("#status").css('visibility', 'visible');
        $("#status").html(`Dealer's bust! You win $${player.betAmount}!`);
            } else if (banker.points== 21 && player.points ==21) {
    $("#status").css('visibility', 'visible');
    $("#status").html(`You're both on 21! Dealer's advantage. Lose $${player.betAmount}!`);
        lose();
    } else if (player.points==21) {
    $("#status").css('visibility', 'visible');
    win();
    $("#status").html(`You got Blackjack! You win $${player.betAmount}!`);
    
    }        else if (x>=4) {
        $("#status").css('visibility', 'visible');
        win();
        $("#status").html(`Five card trick! Win $${player.betAmount}!`);
        
    } else if (y>=4) {
        $("#status").css('visibility', 'visible');
        lose();
        $("#status").hmtl(`Dealer has a five card trick! Lose $${player.betAmount}!`);
       
    } else {}
};

checkStay = () => {
    if (y==4 && banker.points<22) {
        $("#status").css('visibility', 'visible');
        lose();
        $("#status").html(`Dealer got a five card trick! Lose $${player.betAmount}!`);
    } else if (banker.points== 21) {
    $("#status").css('visibility', 'visible');
    lose();
    $("#status").html(`Dealer got Blackjack! You lose $${player.betAmount}!`);
    }
    else if (player.points<banker.points && banker.points<22) {
        lose();
    }
    else if ((banker.points==player.points) && (player.points<21)) {
        $("#status").css('visibility', 'visible');
        draw();
        $("#status").html(`Draw!`);
        
    } else if (banker.points>21) {
        win();
$("#status").css('visibility', 'visible');
$("#status").html(`Dealer's bust! You win $${player.betAmount}!`);}
else {
        return;
    }
};

$('#doubleDown').on('click', () => {
    player.betAmount *=2;
    $("#doubleDown").hide();
    $("#betDoneNumber").html(player.betAmount); 
});

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
    for (b=0; b<player.hand.length; b++) {
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
        for (b=0; b<banker.hand.length; b++) {  
        a+=banker.hand[b].weight;

        }
        banker.points=a;
        return ;
}
$('#start-btn').on('click', () => {
 //accept bet, deal two cards to each player, 2nd of dealer's being hidden
         if (isNaN(parseFloat($("#enterBet").val()))) {
            $("#status").css('visibility', 'visible');
              return $("#status").html("Enter your bet amount to play");
              //$("#enterBet").value = "";
        } else if (parseFloat($("#enterBet").val())==0){
            $("#status").css('visibility', 'visible');
        return $("#status").html("Don't be cheap.");
        } else if ((parseFloat($("#enterBet").val())<0)){
            $("#status").css('visibility', 'visible');
            return $("#status").html("Betting against yourself? Pathetic.");
        }     else {
    player.betAmount = parseFloat($("#enterBet").val());
   $("#status").css('visibility', 'visible');
        }
   if (player.moneyLeft<player.betAmount) {
    let rand = Math.floor(Math.random()*3); 
    let betArray =["Looks like you don't have enough cash! <br>Come back with more money or bet lower!", 
                    "Woah big spender, maybe try an amount you can actually afford",
                    "Little advice, don't try to make bets your wallet can't handle"];
    return $("#status").html(betArray[rand]); 
} else if (player.moneyLeft>200) {
        $("#hit-btn").prop('disabled', true);
        $("#stay-btn").prop('disabled', true);
        return $("#status").html("Ok you've won enough already... you must be counting cards.<br>Get out of here!");   
}
else { //bet accepted
    x=0;
    y=0;
    player.points = 0;
    banker.points = 0;  
    player.hand = [];
    banker.hand = [];
    $("#status").css('visibility', 'visible'); 
    $("#status").html("Cards dealt. Hit or Stand?");
    $("#hit-btn").css('visibility', 'visible');
    $("#stay-btn").css('visibility', 'visible');
    $("#enterBet").hide();
    $("#start-btn").hide();
    $("#betText").hide();
    $("#hit-btn").prop('disabled', false);
    $("#stay-btn").prop('disabled', false);
    $("#betDoneText").css('visibility', 'visible');
    $("#betDoneNumber").css('visibility', 'visible');
    $("#dollarBet").css('visibility', 'visible');
    $("#betDoneText").show();
    $("#betDoneNumber").show();
    $("#dollarBet").show();
    $("#betDoneNumber").html($("#enterBet").val());
    $("#yourCard1").html("");
    $("#yourCard2").html("");
    $("#yourCard3").html("");
    $("#yourCard4").html("");
    $("#bankerCard1").html("");
    $("#bankerCard2").html("");
    $("#bankerCard3").html("");
    $("#bankerCard4").html("");
    $("#bankerCard").show();
    $("#bankerCard1").show();
    $("#bankerCard2").show();
    $("#bankerCard3").show();
    $("#bankerCard4").show();
    $("#yourCard").show();
    $("#yourCard1").show();
    $("#yourCard2").show();
    $("#yourCard3").show();
    $("#yourCard4").show();
createDeck();
shuffleDeck();
dealPlayer();

$("#yourCard").html((JSON.stringify(player.hand[0].values)+JSON.stringify(player.hand[0].suits)).replace(/\"/g, ""));
$("#playerPoints").html(player.points); 
x+=1;
dealPlayer();
$("#yourCard1").html((JSON.stringify(player.hand[1].values)+JSON.stringify(player.hand[1].suits)).replace(/\"/g, ""));
$("#playerPoints").html(player.points); 

dealBanker();
$("#bankerCard").html((JSON.stringify(banker.hand[0].values)+JSON.stringify(banker.hand[0].suits)).replace(/\"/g, ""));
$("#bankerPoints").html(banker.points); 
y+=1;
dealBanker();
$("#bankerCard1").html("?");    
$("#bankerPoints").html("?");
y+=1;
// console.log(player);
// console.log(banker);

if (player.points==21 && banker.points==21) {
    draw();
    $("#status").html(`You and the dealer both got blackjack, draw.`);
}
else if (player.points==21) {
    win();
    $("#status").html(`You got Blackjack! Win $${player.betAmount}!`);
} else if (player.points>21) {
    player.hand[0].weight = 1;
    $("#doubleDown").hide();
} else {
    $("#doubleDown").show();
}
if (banker.points>21) {
    banker.hand[0].weight = 1;
}
}
$("#playerPoints").html(player.points); 
// console.log(player);
// console.log(banker);
});
$('#hit-btn').on('click', ()=> {

    $("#doubleDown").hide();
    dealPlayer();  
    x=x+1;
    check();
    if (x==2) {$("#yourCard2").html(("    "+JSON.stringify(player.hand[x].values)+JSON.stringify(player.hand[x].suits)+"     ").replace(/\"/g, ""));
} else if (x==3) {$("#yourCard3").html(("    "+JSON.stringify(player.hand[x].values)+JSON.stringify(player.hand[x].suits)+"     ").replace(/\"/g, ""));
} else if (x==4) {$("#yourCard4").html(("    "+JSON.stringify(player.hand[x].values)+JSON.stringify(player.hand[x].suits)+"     ").replace(/\"/g, ""));
} 
    $("#playerPoints").html(player.points); 

    // console.log("y"+y);
    // console.log("x"+x);
    // console.log(banker);
    // console.log(player);
});

$('#stay-btn').on('click', ()=> {
    $("#hit-btn").prop('disabled', true);
    $("#stay-btn").prop('disabled', true);
    $("#doubleDown").hide();
    $("#bankerCard1").html((JSON.stringify(banker.hand[1].values)+JSON.stringify(banker.hand[1].suits)).replace(/\"/g, ""));
    $("#bankerPoints").html(banker.points); 

    if (banker.points==21) {
        lose();  
        $("#status").css('visibility', 'visible');
        $("#status").html(`Dealer got Blackjack! You lose $${player.betAmount}!`);
        $("#bankerPoints").html(banker.points); 
        
    }
    else if (banker.points>player.points&&banker.points<22) {
        $("#status").css('visibility', 'visible');
        lose();
        $("#status").html(`You lose $${player.betAmount}!`);
        $("#bankerPoints").html(banker.points); 
        
    } else if (banker.points==player.points&&banker.points>16){
        $("#status").css('visibility', 'visible');
        draw();
        $("#status").html("Draw"); 
        $("#bankerPoints").html(banker.points); 
        
    }
    else {
    dealBanker();
    
    $("#bankerCard2").html(("    "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, ""));
    checkStay();  
    y+=1;
    if (banker.points==21) {
        $("#status").css('visibility', 'visible');
        lose(); 
        $("#status").html(`Dealer got Blackjack! You lose $${player.betAmount}!`);
        $("#bankerPoints").html(banker.points); 
         
    }
    else if (banker.points<player.points) {
        $("#status").css('visibility', 'visible');
        dealBanker();
        $("#bankerCard3").html(("   "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, ""));
        
        $("#bankerPoints").html(banker.points); 

        checkStay();
        y+=1;
    } else if (banker.points==player.points&&banker.points>15){
        draw();
        $("#bankerPoints").html(banker.points); 
        $("#status").css('visibility', 'visible');
        $("#status").html("Draw"); 
        
    } else {}
        if (banker.points<player.points) {
        $("#status").css('visibility', 'visible');
        dealBanker();
        $("#bankerCard4").html(("    "+JSON.stringify(banker.hand[y].values)+JSON.stringify(banker.hand[y].suits)+"     ").replace(/\"/g, ""));
        checkStay();
        $("#bankerPoints").html(banker.points); 
    } else if (banker.points==player.points&&banker.points>15){
        draw();
        $("#status").css('visibility', 'visible');
        $("#status").html("Draw"); 
    } else {
    } 
}
    $("#playerPoints").html(player.points); 
    $("#bankerPoints").html(banker.points);     
$("#bankerPoints").html(banker.points); 
console.log("y"+y);
console.log("x"+x);
console.log(banker);
console.log(player);
});
}); //closes jquery document ready function