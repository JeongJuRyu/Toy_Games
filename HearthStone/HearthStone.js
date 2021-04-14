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
        return 'end'; // my.cost가 data의 cost보다 작다면 더 이상 필드에 추가가 불가능하므로 end를 return
    }
    var idx = obj.deckData.indexOf(data);
    obj.deckData.splice(idx,1); // 덱 data에서 카드 제거
    obj.fieldData.push(data); // 필드 data에 카드 추가
    redrawField(obj);
    redrawDeck(obj)
    data.field = true; // data가 필드에 올라갔다면 클릭해도 아무 일 없도록
    obj.cost.textContent = nowCost - data.cost;
}
function redrawField(obj){
    obj.field.innerHTML = '';
    obj.fieldData.forEach(function(data){
        connectCardDom(data, obj.field);
    })
}
function redrawDeck(obj){
    obj.deck.innerHTML = '';
    obj.deckData.forEach(function(data){
        connectCardDom(data, obj.deck);
    });
}
function redrawHero(obj){
    obj.hero.innerHTML = '';
    connectCardDom(obj.heroData[0], obj.hero, true);
}
function redrawScreen(myScreen){
    var obj = myScreen ? my : rival;
    redrawField(obj);
    redrawDeck(obj);
    redrawHero(obj);
}

function action(card, data, myTurn){
    var me = myTurn ? my : rival;
    var opponent = myTurn ? rival : my;
    if(card.classList.contains('card-turnover')){
        return;
    }
    //상대카드면서 내 카드가 선택되어 있고 턴이 끝난 카드가 아니면
    var rivalCard = myTurn ? !data.mine : data.mine;
    if(rivalCard && me.selectedCard) {
        data.hp = data.hp - me.selectedCardData.att;
        if(data.hp<=0){ //상대 카드가 죽었다면
            var index = opponent.fieldData.indexOf(data);
            if(index > -1){ //쫄병이 죽었을 때
                opponent.fieldData.splice(index,1);
            } else { // 죽은 카드가 영웅일 때
                alert('승리하셨습니다!')
                init();
            }
        }
        redrawScreen(!myTurn);
        me.selectedCard.classList.remove('card-selected');
        me.selectedCard.classList.add('card-turnover');
        me.selectedCard = null;
        me.selectedCardData = null;
        return; 
    } else if (rivalCard){
        return;
    }
    //필드에 있는 카드를 클릭했다면
    if (data.field){
        card.parentNode.querySelectorAll('.card').forEach((card)=>{
           card.classList.remove('card-selected'); 
        });
        card.classList.add('card-selected');
        me.selectedCard = card;
        me.selectedCardData = data;
    } else { // 덱에 있는 카드를 클릭했다면 
        if(deckToField(data, myTurn) !== 'end'){
            myTurn ? makeMyDeck(1) : makeRivalDeck(1);
        }
    }
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
        action(card, data, turn);
    })
    dom.appendChild(card);
}

function makeRivalDeck(num){
    for(var i =0; i < num; i++){
        rival.deckData.push(cardFactory());
    }
    redrawDeck(rival);
}

function makeMyDeck(num){
    for(var i =0; i < num; i++){
        my.deckData.push(cardFactory(false,true));
    }
    redrawDeck(my);
}

function makeRivalHero(){
    rivalHeroData = cardFactory(true);
    rival.heroData.push(rivalHeroData);
    connectCardDom(rivalHeroData, rival.hero, true);
}
    

function makeMyHero(){
    myHeroData = cardFactory(true,true);
    my.heroData.push(myHeroData);
    connectCardDom(myHeroData, my.hero, true);
}

function init(){
    rival.fieldData = [];
    rival.deckData = [];
    rival.heroData = [];
    my.fieldData = [];
    my.deckData = [];
    my.heroData = [];
    makeRivalDeck(5);
    makeMyDeck(5);
    makeMyHero();
    makeRivalHero();
    redrawScreen(false);
    redrawScreen(true);
}

function Card(hero, myCard){
    if(hero){
        this.att = Math.ceil(Math.random() * 2);
        this.hp = Math.ceil(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
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
    var obj = turn ? my : rival;
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    redrawField(obj);
    redrawHero(obj);
    turn = !turn;
    if(turn){
        my.cost.textContent = 10;
    }
    else{
        rival.cost.textContent = 10;
    }
})
init();