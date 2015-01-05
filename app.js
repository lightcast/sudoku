/**
 * Created by JD on 12/1/14.
 */
// used to create an empty array this is the main function for the entire game
function  createArray(length){
    var arr = new Array(length || 0),
        i = length;
    if(arguments.length > 1){
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}

function tableCreate() {
        "use strict";
    var rowColor = 0;
    var board = createBoard();
        for(var x=1; x <=9; x++){
            rowColor += 1;
            var rightColor = 0;
            for(var y =1; y <=9; y++){
                rightColor += 1;
                var cellID = parseInt(  (x + y));
                var cell = document.getElementById('sudokuTable').appendChild(document.createElement('div'));
                var inputCellID  = x + '-' + y;
                var input = document.createElement('input');
                if(board[x-1][y-1] !== 0){
                    cell.innerHTML = "<input type='text' id=\'" + inputCellID + "\' class='inputCell' readonly ='readonly' maxlength='1' value=\'" + board[x-1][y-1] + "\'/>" ;
                }else{
                    cell.innerHTML =  "<input type='text' id=\'" + inputCellID + "'\ class='inputCell' maxlength='1' value='' onkeypress='return event.charCode >= 48 && event.charCode <= 57' />";
                }
                cell.style.fontSize = '35px';
                cell.style.textAlign = 'center';



                cell.style.border = ' solid 1px #a8aaae';

                // in order to do the 9x9 grid we do the following
                if(y === 1){
                    cell.style.borderLeft = "3px solid black";
                }
                if(rightColor % 3 === 0){
                    cell.style.borderRight = "3px solid black";
                }
                if(rowColor === 1){
                    cell.style.borderTop = "3px solid black";
                }
                if(rowColor % 3 === 0){
                    cell.style.borderBottom = "3px solid black";
                }
                // we finish styling the grid
                cell.style.width = '55px';
                cell.style.height = '55px';
                cell.setAttribute('id', 'div');
            }
        }
}
tableCreate();

function totalCount(board){
    var totalCount = 0;
    for(row in board){
        var count = 0;
        for(var i = 0; i < board[row].length ; i++ ){
            if(board[row][i] === 0){
                return false;
            }else{
                count += board[row][i];
            }
        }
        if(count !== 45){
            return false;
        }else{
            totalCount += count;
        }
    }
    return (totalCount === 405); // total count of the entire board should equal 405
}


function validateHorizontal(board){
    for(var outer = 0; outer < 9; outer++){
        var value = 0;
        for(var inner = 0; inner < 9; inner++){
            value += board[outer][inner];
        }
        if(value !== 45){
            return false;
        }
    }
    return true;
}


function validateVertical(board){
    for(var b in board){
        for(var inner = 0; inner < 9; inner++){
            var value = 0;
            for(var outer = 0; outer < 9; outer++){
                value += board[outer][inner];
            }
            if(value !== 45){
                return false;
            }
        }
    }
    return true;
}


function validateSquares(board){
    var rowPosition = 0;
    var columnPosition = 0;
    for(var b = 0; b < board.length -1; b++){
        var value = 0;
        var columnEnd = columnPosition + 3;
        var rowEnd = rowPosition + 3;
        for(; rowPosition < rowEnd; rowPosition++){
            for(; columnPosition < columnEnd; columnPosition++){
                value += board[columnPosition][rowPosition];

            }
            columnPosition = columnEnd - 3;
        }
        if(value !== 45){
            return false;
        }
        if(rowEnd === 9){
            rowPosition = 0;
        }
    }
    return true;
}

function createBoard(){
    /*return [[5, 0, 4, 0, 7, 0, 9, 0, 0],
        [6, 0, 2, 1, 9, 0, 3, 4, 0],
        [1, 9, 0, 3, 4, 0, 5, 6, 7],
        [8, 0, 9, 0, 6, 1, 4, 0, 3],
        [0, 0, 6, 8, 0, 3, 0, 9, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [9, 0, 1, 0, 3, 7, 0, 8, 4],
        [2, 0, 7, 0, 1, 0, 6, 0, 5],
        [0, 4, 0, 2, 0, 6, 1, 0, 0]];*/

  return[  [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 0]];
}



function validSolution(){
    var board = getHtmlBoard();

    //console.log(board);
    var msg;

    if(totalCount(board) && validateHorizontal(board) && validateVertical(board) && validateSquares(board)){
        msg = 'Congratulations you completed the board!!'
    }else{
        msg = 'Your board contains errors.';
    }
    alert(msg);
}

function getHtmlBoard(){
    var outerArray = [];
   for(var i=1; i <=9; i++){
       var innerArray =[];
       for(var j=1; j<=9; j++){
           if(document.getElementById(i +'-' + j).value === ''){
               innerArray.push(0);
           }else{
               innerArray.push(parseInt(document.getElementById(i +'-' + j).value, 10));
           }
       }
       outerArray.push(innerArray);
   }
    return outerArray;
}
