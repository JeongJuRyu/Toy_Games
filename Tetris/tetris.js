var tetris = document.querySelector('#tetris');
var tetrisData = [];

function makeSquare(){
    var fragment = document.createDocumentFragment();
    for(var i = 0; i < 20; i++){
        var tr  = document.createElement('tr');
        for(var j = 0; j < 10; j++){
            var td = document.createElement('td');
            tr.appendChild(td);
        }
        fragment.appendChild(tr);
    }
    tetris.appendChild(fragment);
}

window.addEventListener('keyup', (e)=> {
    console.log('hi');
})

makeSquare();