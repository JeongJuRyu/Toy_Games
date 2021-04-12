var rivalHero = document.getElementById('rival-hero');
var myHero = document.getElementById('my-hero');
var rivalDeck = document.getElementById('rival-deck');
var myDeck = document.getElementById('my-deck');
var rivalDeckData = [];
var myDeckData = [];
var rivalHeroData;
var myHeroData;
var rivalFieldData = [];
var myFieldData = [];
function connectCardDom(data, dom, hero){
    var card = document.querySelector('.card-hidden .card').cloneNode(true);
    //true 인자를 줌으로써 내부 태그들까지 복사
    card.querySelector('.card-cost').textContent = data.cost;
    card.querySelector('.card-att').textContent = data.att;
    card.querySelector('.card-hp').textContent = data.hp;
    if(hero){
        card.querySelector('.card-cost').style.display = 'none';
        var name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }
    card.addEventListener('click', () => {
        if(turn){
            myDeckData.indexOf(card);
            myDeckData.splice(idx,1);
            myFieldData.push(card);
        }else {
            
        }
    })
    dom.appendChild(card);
}
function makeRivalDeck(num){
    for(var i =0; i < num; i++){
        rivalDeckData.push(cardFactory());
    }
    rivalDeckData.forEach((data)=>{
        connectCardDom(data, rivalDeck);
    })
}

function makeMyDeck(num){
    for(var i =0; i < num; i++){
        myDeckData.push(cardFactory());
    }
    myDeckData.forEach((data)=>{
        connectCardDom(data, myDeck);
    })
}

function makeRivalHero(){
    rivalHeroData = cardFactory(true);
    connectCardDom(rivalHeroData, rivalHero, true);
}
    

function makeMyHero(){
    myHeroData = cardFactory(true);
    connectCardDom(myHeroData, myHero, true);
}

function init(){
    makeRivalDeck(5);
    makeMyDeck(5);
    makeMyHero();
    makeRivalHero();
}

function Card(hero){
    if(hero){
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
}

function cardFactory(hero){

    return new Card(hero);
}
init();