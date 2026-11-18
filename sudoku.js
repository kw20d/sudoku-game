let setBoard = (passedPuzzle, passedCellsNum) => {
    let arangedBoard = [];
    for(let i = 0; i < passedCellsNum; i++)
    {
        arangedBoard[i] = {'value': passedPuzzle[i], 'given': true};
        if(arangedBoard[i].value === '0') arangedBoard[i].given = false;
    }
    return arangedBoard;
};

//arr[0] is row and arr[1] is column
let posOf = (index) => {
    if(index >= 81 || index < 0) return;
    return [Math.floor(index / 9), index % 9];
};

let indexOf = (row, col) => {
    return row * 9 + col;
};

//arr[0] is row and arr[1] is column
let startBlockOf = (row, col) => {
    return [Math.floor(row / 3) * 3, Math.floor(col / 3) * 3]
};

let isGiven = (row, col, passedBoard) => {
    if(passedBoard[indexOf(row, col)].given === true)
        return true;
    return false;
};

let rowCheck = (digit, row, col,passedBoard) => {
    let index = indexOf(row, col);
    for(let i = indexOf(row, 0); i < indexOf(row, 0) + 9; i++)
    {
        if(i != index && passedBoard[i].value === digit)
            return true;
    }
    return false;
};

let columnCheck = (digit,row , col, passedBoard) => {
    let index = indexOf(row, col);
    for(let i = indexOf(0, col); i < passedBoard.length; i += 9)
    {
        if(i != index && passedBoard[i].value === digit)
            return true;
    }
    return false;
};

let blockCheck = (digit, passedBoard, row, col, orRow, orCol) => {
    let orIndex = indexOf(orRow, orCol);
    let index = indexOf(row, col);
    for(let i = 0; i < 3; i++)
    {
        if(index + i != orIndex && passedBoard[index + i].value === digit) return true;
        for(let j = 1; j < 3; j++)
        {
            if((index + i) + (j * 9) != orIndex && passedBoard[(index + i) + (j * 9)].value === digit) return true;
        }
    }
    return false;
};

let isIllegal = (digit, passedBoard, row, col) => {
    if(digit === '0') return false;
    let arr = startBlockOf(row, col);
    return (rowCheck(digit, row, col, passedBoard) || columnCheck(digit, row, col, passedBoard) || blockCheck(digit, passedBoard, arr[0], arr[1], row, col));
};

let isSolved = (passedBoard) => {
    for(let i = 0; i < passedBoard.length; i++)
    {
        if(passedBoard[i].value === '0') return false;
        if(isIllegal(passedBoard[i].value, passedBoard, posOf(i)[0], posOf(i)[1]))
            return false;
    }
    return true;
};

const puzzle = '530070000600195000098000060800060003400803001700020006060000280000419005000080079';
const solution = '534678912672195348198342567859761423426853791713924856961537284287419635345286179';

let cellsNum = 81;
let board = setBoard(puzzle, cellsNum);
let boardSolu = setBoard(solution, cellsNum);


console.log(isSolved(boardSolu));