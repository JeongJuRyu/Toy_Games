var tbody = document.querySelector('#table tbody');
var dataset = []; // 우리가 따로 관리할 2차원 배열

document.querySelector('#exec').addEventListener('click', () => {
    tbody.innerHTML = '';
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    var candid = Array(hor * ver)
        .fill()
        .map((component, index) => {
            return index + 1;
        })
    var shuffle = [];
    while(candid.length > 80){
        var moveValue = candid.splice(Math.floor(Math.random() * candid.length),1)[0];
        shuffle.push(moveValue);
    } // 랜덤으로 지뢰의 위치가 shuffle에 들어간다.

    for(var i  = 0; i < ver; i++){
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);
        for(var j = 0; j < hor;j++){
            arr.push(1);
            var td = document.createElement('td');
            td.addEventListener('contextmenu', (e)=> {
                e.preventDefault();
                var parentTr = e.target.parentNode;
                var parentTbody = e.target.parentNode.parentNode;
                var square = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                var long = Array.prototype.indexOf.call(parentTbody.children, parentTr);
                console.log(parentTr);
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent = '!';
                } else if (e.currentTarget.textContent === '!') {
                    e.currentTarget.textContent = '?';
                } else if (e.currentTarget.textContent === '?'){
                    if(dataset[long][square] === 1){
                    e.currentTarget.textContent = '';
                    } else if (dataset[long][square] === 'X'){
                    e.currentTarget.textContent = 'X';
                    }
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    for(var k = 0; k < shuffle.length;k++){ //예 59
        var row = Math.floor(shuffle[k]/10); // 예 6
        var column = shuffle[k] % 10; // 예 9
        tbody.children[row].children[column].textContent = 'X';
        dataset[row][column] = 'X';
    }
    
});
// 비동기 코드는 동기보다 나중에 실행 될 확률 매우 높다.
tbody.querySelectorAll('td').forEach((td)=>{
    td.addEventListener('contextmenu', ()=>{
        
    })
});