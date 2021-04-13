var rival = {
    hero : document.getElementById('rival-hero'),
    deck : document.getElementById('rival-deck'),
    field : document.getElementById('rival-cards'),
    cost : document.getElementById('rival-cost'),
    deckData : [],
    heroData : [],
    fieldData : [],
    selectedCard : null,
    selectedCardData : null,
};


var my = {
    hero : document.getElementById('my-hero'),
    deck : document.getElementById('my-deck'),
    field : document.getElementById('my-cards'),
    cost : document.getElementById('my-cost'),
    deckData : [],
    heroData : [],
    fieldData : [],
    selectedCard : null,
    selectedCardData : null,
};

var turnButton = document.querySelector('#turn-btn');
var turn = true; // true시 내 턴, false시 상대 턴

function deckToField(data, myTurn) { // 덱에 있는 카드 클릭 시 필드로 카드를 옮기는 함수
    var obj = myTurn ? my : rival;
    var nowCost = Number(obj.cost.textContent);
    if(nowCost < data.cost){ // 현재 남은 cost와 카드의 cost 비교
        return 'end';
    }
    var idx = obj.deckData.indexOf(data);
        obj.deckData.splice(idx,1); // 덱에서 카드 제거
        obj.fieldData.push(data); // field에 카드 추가
        obj.deck.innerHTML = ''; 
        obj.field.innerHTML = '';
        obj.fieldData.forEach(function(data){
            connectCardDom(data, obj.field);
        })
        obj.deckData.forEach(function(data){
            connectCardDom(data, obj.deck);
        });
        data.field = true; // data가 필드에 올라갔다면 클릭해도 아무 일 없도록
        obj.cost.textContent = nowCost - data.cost;
}

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
        if(turn){ // 내 턴이면
            if(!data.mine) {
                data.hp = data.hp - my.selectedCard.att;
                console.log(data.hp);
                my.selectedCard.classList.remove('card-selected');
                my.selectedCard.classList.add('card-turnover');
                my.selectedCard = null;
                my.selectedCardData = null;
                return; 
            } else if (1){}
            // 내 턴이 아닌데 카드 클릭하면 이벤트 종료
            if (data.field){
                card.parentNode.querySelectorAll('.card').forEach((card)=>{
                   card.classList.remove('card-selected'); 
                });
                card.classList.add('card-selected');
                my.selectedCard = card;
                my.selectedCardData = data;
            } else {
                if(deckToField(data, true) !== 'end'){
                    makeMyDeck(1);
                }
            }
        } else { //상대의 턴
            if(data.mine || data.field) return;
            var nowCost = Number(rival.cost.textContent);
            if(nowCost < data.cost){
                return;
            }
            if(deckToField(data) !== 'end'){
                makeRivalDeck(1);
            }
            data.field = true;
        }
    })
    dom.appendChild(card);
}

function makeRivalDeck(num){
    for(var i =0; i < num; i++){
        rival.deckData.push(cardFactory());
    }
    rival.deck.innerHTML = '';
    rival.deckData.forEach((data)=>{
        connectCardDom(data, rival.deck);
    })
}

function makeMyDeck(num){
    for(var i =0; i < num; i++){
        my.deckData.push(cardFactory(false,true));
    }
    my.deck.innerHTML = '';
    my.deckData.forEach((data)=>{
        connectCardDom(data, my.deck);
    })
}

function makeRivalHero(){
    rivalHeroData = cardFactory(true);
    connectCardDom(rivalHeroData, rival.hero, true);
}
    

function makeMyHero(){
    myHeroData = cardFactory(true,true);
    connectCardDom(myHeroData, my.hero, true);
}

function init(){
    makeRivalDeck(5);
    makeMyDeck(5);
    makeMyHero();
    makeRivalHero();
}

function Card(hero, myCard){
    if(hero){
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
    } else {
        this.att = Math.ceil(Math.random() * 5);
        this.hp = Math.ceil(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
    }
    if(myCard){
        this.mine = true;
    }
}

function cardFactory(hero, myCard){

    return new Card(hero, myCard);
}

turnButton.addEventListener('click',() => {
    turn = !turn;
    if(turn){
        my.cost.textContent = 10;
    }
    else{
        rival.cost.textContent = 10;
    }
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
})
init();