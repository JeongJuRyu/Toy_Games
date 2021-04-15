var table = document.getElementById('table');
var data = []; // 현재 화면의 data와 동기화
var scoreTable = document.getElementById('score'); // 점수표

var startDrag = false;
var dragging = false;
//direction을 판단하기 위한 변수
var startXY; 
var endXY;

function init(){
    data = []; // game over시 마다 data를 초기화
    var fragment = document.createDocumentFragment();
    [1,2,3,4].forEach(()=> {
        var rowData = [];
        data.push(rowData);
        var tr = document.createElement('tr');
        [1,2,3,4].forEach((column)=>{
            rowData.push(0);
            var td = document.createElement('td');
            tr.appendChild(td);
        });
        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
    scoreTable.textContent = 0;
}

function createRandomly(){
    var emptyArray = [];
    data.forEach((rowData,i)=>{
        rowData.forEach((columnData, j)=>{
            if(!columnData){ //행 데이터가 0일 때
                emptyArray.push([i,j]);
            }
            
        });
    });
    if(emptyArray.length === 0){
        alert(`Game Over! Your Score : ${scoreTable.textContent}`);
        table.innerHTML = '';
        init();
    } else {
        var randomSquare = emptyArray[Math.floor(Math.random() * emptyArray.length)];
        data[randomSquare[0]][randomSquare[1]] = 2;
        draw();
    }
}

function draw(){
    data.forEach((rowData,i)=>{
        rowData.forEach((columnData, j)=>{
            if(columnData > 0){
                table.children[i].children[j].textContent = columnData;
            } else {
                table.children[i].children[j].textContent = '';
            }
        });
    });
}

window.addEventListener('mousedown', (event) => {
    startDrag = true;
    startXY = [event.clientX, event.clientY];
})

window.addEventListener('mousemove', () => {
    if(startDrag) {
        dragging = true;
    }
})

window.addEventListener('mouseup', (event) => {
    var direction;
    startDrag = false
    endXY = [event.clientX, event.clientY];
        if(dragging){
        var Xdifference = endXY[0] - startXY[0];
        var Ydifference = endXY[1] - startXY[1];
        if(Xdifference < 0 && Math.abs(Xdifference) / Math.abs(Ydifference)> 1){
            direction = 'left';
        }
        else if(Xdifference > 0 && Math.abs(Xdifference) / Math.abs(Ydifference) > 1){
            direction = 'right';
        }
        else if(Ydifference > 0 && Math.abs(Xdifference) / Math.abs(Ydifference) < 1) {
            direction = 'down';
        }
        else if(Ydifference < 0 && Math.abs(Xdifference) / Math.abs(Ydifference) < 1){
            direction = 'up'
        }
    }
    switch(direction){
        case 'left':
            var newData = [
                [],
                [],
                [],
                [],
            ];
            data.forEach((rowData,i)=>{
                rowData.forEach((columnData, j)=>{
                    if(columnData){
                        if(newData[i][newData[i].length-1] && newData[i][newData[i].length-1] === columnData){
                            newData[i][newData[i].length-1] *= 2;
                            var nowScore = parseInt(scoreTable.textContent, 10);
                            scoreTable.textContent = nowScore + newData[i][newData[i].length-1];
                        } else{
                            newData[i].push(columnData);
                        }
                    }
                });
            });
            [1,2,3,4].forEach((rowData,i) => {
                [1,2,3,4].forEach((columnData, j) => {
                    data[i][j] = newData[i][j] || 0;
                    
                });
            });
            break;
        case 'right':
            var newData = [
                [],
                [],
                [],
                [],
            ];
            data.forEach((rowData,i)=>{
                rowData.forEach((columnData, j)=>{
                    if(columnData){
                        if(newData[i][newData[i].length-1] && newData[i][newData[i].length-1] === columnData){
                            newData[i][newData[i].length-1] *= 2;
                            var nowScore = parseInt(scoreTable.textContent, 10);
                            scoreTable.textContent = nowScore + newData[i][newData[i].length-1];
                        } else{
                            newData[i].unshift(columnData);
                        }
                    }
                });
            });
            [1,2,3,4].forEach((rowData,i) => {
                [1,2,3,4].forEach((columnData, j) => {
                    data[i][3-j] = newData[i][j] || 0;
                });
            });
            break;
        case 'up':
            var newData = [
                [],
                [],
                [],
                [],
            ];
            data.forEach((rowData,i)=>{
                rowData.forEach((columnData, j)=>{
                    if(columnData){
                        if(newData[j][newData[j].length-1] && newData[j][newData[j].length-1] === columnData){
                            newData[j][newData[j].length-1] *= 2;
                            var nowScore = parseInt(scoreTable.textContent, 10);
                            scoreTable.textContent = nowScore + newData[j][newData[j].length-1];
                        } else{
                            newData[j].push(columnData);
                        }
                    }
                });
            });
            [1,2,3,4].forEach((columnData,i) => {
                [1,2,3,4].forEach((rowData, j) => {
                    data[j][i] = newData[i][j] || 0;
                });
            });
            break;
        case 'down':
            var newData = [
                [],
                [],
                [],
                [],
            ];
            data.forEach((rowData,i)=>{
                rowData.forEach((columnData, j)=>{
                    if(columnData){
                        if(newData[j][0] && newData[j][0] === columnData){
                            newData[j][0] *= 2;
                            var nowScore = parseInt(scoreTable.textContent, 10);
                            scoreTable.textContent = nowScore + newData[j][0];
                        } else{
                            newData[j].unshift(columnData);
                        }
                    }
                });
            });
            [1,2,3,4].forEach((columnData,i) => {
                [1,2,3,4].forEach((rowData, j) => {
                    data[3-j][i] = newData[i][j] || 0;
                });
            });
            break;
        
    }
    draw();
    createRandomly();
})


init();
createRandomly();
draw();