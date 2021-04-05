var candArray = Array(45).fill().map(function(component, index){
    return index+1;
});
     

var shuffle = [];

while(candArray.length > 0){
    var moveValue = candArray.splice(Math.floor(Math.random() * candArray.length),  1)[0];
    shuffle.push(moveValue);
}

var bonus = shuffle[shuffle.length-1];
var chosenNumber = shuffle.slice(0,6);
console.log(`이번 주 번호 : ${chosenNumber.sort(function(p,c) {return c-p;})} 보너스 번호 : ${bonus}`);

var result = document.getElementById('result');
var bonusBall = document.getElementsByClassName('bonus')[0];

function ballPaint(ballNumber, result){
    var ball = document.createElement('div');
    ball.textContent= ballNumber;
    ball.style.color = '#000';
    ball.style.fontWeight = 'bold';
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '10px';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '10px';
    var backgroundColor;
    if(ballNumber >= 41){
        backgroundColor = 'green';
    }
    else if(ballNumber >= 31){
        backgroundColor = 'blue';
    }
    else if(ballNumber >= 21){
        backgroundColor = 'yellow';
    }
    else if(ballNumber >= 11){
        backgroundColor = 'orange';
    }
    else {
        backgroundColor = 'red';
    }
    ball.style.background = backgroundColor;
    result.appendChild(ball);
}
setTimeout(()=> ballPaint(chosenNumber[0],result), 1000);
setTimeout(()=> ballPaint(chosenNumber[1],result), 2000);
setTimeout(()=> ballPaint(chosenNumber[2],result), 3000);
setTimeout(()=> ballPaint(chosenNumber[3],result), 4000);
setTimeout(()=> ballPaint(chosenNumber[4],result), 5000);
setTimeout(()=> ballPaint(chosenNumber[5],result), 6000);
setTimeout(()=> ballPaint(bonus,bonusBall), 7000);