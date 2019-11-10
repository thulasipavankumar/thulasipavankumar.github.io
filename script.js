const gridInput =  [
     [ 0, 0, 1, 0, 1 ],
     [ 1, 1, 1, 0, 0 ],
     [ 1, 1, 0, 1, 1 ],
     [ 0, 0, 0, 0, 0 ],
     [ 1, 1, 1, 0, 0 ],
];
var currentCount =0;
var adjacentArray =[];
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var [r, c] = [gridInput[0].length, gridInput.length]; 
var m = Array(r).fill(getRandomInt(2)).map(()=>Array(c).fill(getRandomInt(2)));
// console.log(m);
var grid = clickableGrid(gridInput[0].length, gridInput.length,function(el,row,col,i){
    var columnIndex = col;
    // adjacentArray =[];
    // findAdjacent(i,row,col);
    el.innerHTML = gridInput[row][col];
    entry(row,col);

});
function fillElement(){
   // document.
   // el.innerHTML = gridInput[row][col];
}
  // var xPosition = 4,yPosition = 4;
	// var count = 0;
	// var temp = {};
  let finalCount = [],
    temparr = [];
let originalMatrix = [];




let arr = gridInput;  // <- original array
var n = arr.length; //<- original array length
let visitedArr = new Array(n).fill(false).map(() => new Array(n).fill(false));
console.log("length",n);
const resetAllValues = () => { 
        visitedArr = new Array(n).fill(false).map(() => new Array(n).fill(false));
        temparr = [];
        finalCount = [];
}

const entry = (i, j) => {
    resetAllValues();
    pushInitialElement(i,j);
    //setElementToVisited(i,j);
    while (hasMoreElements()) {
        let topElement = getTopOfStack();
        if(!isVisited(topElement.i,topElement.j)){
            setElementToVisited(topElement.i,topElement.j);
            finalCount.push(topElement);
            traverse_Possible_Adjacent_Nodes(topElement.i, topElement.j);
        }
    }
    console.log(finalCount);

}
const pushInitialElement = (i,j) => temparr.push({ i: i, j: j })
const isVisited = (i, j) => visitedArr[i][j];

const tryLeft = (i, j) => {
    j--;
    if (isValid(i, j)) 
        temparr.push({ i: i, j: j });
}
const tryRight = (i, j) => {
    j++;
    if (isValid(i, j)) 
        temparr.push({ i: i, j: j });
}
const tryTop = (i, j) => {
    i--;
    if (isValid(i, j)) 
        temparr.push({ i: i, j: j });
}
const tryBottom = (i, j) => {
    i++;
    if (isValid(i, j)) 
        temparr.push({ i: i, j: j });
}
const setElementToVisited = (i,j) =>{
    visitedArr[i][j] = true;
}
const isValid = (i, j) => {
          console.log("trying", i,j,n)
    if (i >= 0 && j >= 0 && i < n && j < n)
        if (!isVisited(i, j))
            if (arr[i][j] === 1)
                return true;
    return false;
}
const traverse_Possible_Adjacent_Nodes = (i, j) => {
     console.log("trying adjacent for",i,j);
    tryBottom(i, j);
    tryTop(i, j);
    tryLeft(i, j);
    tryRight(i, j);
}
const getTopOfStack = () => temparr.pop();
const hasMoreElements = () => temparr.length ? true : false;

function load(){
document.body.appendChild(grid);
}
     
function clickableGrid( rows, cols, callback ){
    var i=0;
    var grid = document.createElement('table');
    grid.className = 'grid';
    for (var r=0;r<rows;++r){
        var tr = grid.appendChild(document.createElement('tr'));
        for (var c=0;c<cols;++c){
            var cell = tr.appendChild(document.createElement('td'));
            if(gridInput[r][c]===1){
              cell.className='block';
              i = 1;
            }else i=0;
            // cell.innerHTML = gridInput[r][c];
            cell.addEventListener('click',(function(el,r,c,i){
                return function(){
                    callback(el,r,c,i);
                }
            })(cell,r,c,i),false);
        }
    }
    return grid;
}