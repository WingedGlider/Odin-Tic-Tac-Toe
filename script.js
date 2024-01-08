const game = function () {
    let grid = [];
    let playerchoice;
    let computerchoice;
    let winner;
    let gamestate;
    const selectscreen = document.querySelector('body').innerHTML;

    const select = function (){
        document.querySelector('body').innerHTML = selectscreen;
        document.querySelectorAll('.pick-card').forEach(element =>element.addEventListener('click', ()=>{
            element.classList.add('active');
            document.querySelectorAll('.active').forEach(e => {
                if (e != element) e.classList.remove('active')
            });
        }));
        document.querySelector('button').addEventListener('click', ()=> {
            if(document.querySelector('.active') != null) initialize()
        });
    }
    
    const initialize = function (){
        gamestate = true;
        if (document.querySelector('.active') != null) playerchoice = document.querySelector('.active').innerHTML.toLowerCase();
        document.querySelector('body').innerHTML = '';
        document.querySelector('body').innerHTML = '<h1>Tic-Tac-Toe</h1><div class=gameboard></div>';
        for(let i = 0; i < 3; i++){
            document.querySelector('.gameboard').innerHTML += '<div></div>';
            let array = []; 
            for(let j = 0; j < 3; j++){
                array.push('');
                document.querySelector('.gameboard>div:nth-child('+(i+1)+')').innerHTML += '<div class=tile><p></p></div>';
            }
            grid.push(array);
        }
        document.querySelectorAll('.tile').forEach(tile =>{
            tile.addEventListener('click', ()=>{
                if (tile.querySelector('p').innerHTML == '') play(tile);
            });
        });
        if (playerchoice == 'x') computerchoice = 'o';
        else computerchoice = 'x';
    }

    const play = function(currentTile){
        currentTile.querySelector('p').innerHTML = playerchoice;
        addTile(currentTile, playerchoice);
        winstate(currentTile);
        console.log(gamestate);
        if (gamestate == false) endScreen();
        else{ 
            currentTile = compTurn();
            currentTile.querySelector('p').innerHTML = computerchoice;
            addTile(currentTile, computerchoice)
            winstate(currentTile); 
            if (gamestate == false) endScreen();
        }
    }

    const addTile = function(currentTile, choice){
        const tileArray = document.querySelectorAll('.tile');
        const gridArray = [] 
        grid.forEach(array => array.forEach(cell => gridArray.push(cell)));
        for(let i = 0; i < tileArray.length; i++){
            if (tileArray[i] === currentTile) gridArray[i] = choice;
        }
        let counter = 0;
        grid = [];
        for(let i = 0; i < 3; i++){
            let array = [];
            for(let j = 0; j < 3; j++){
                array.push(gridArray[counter]);
                counter++;
            }
            grid.push(array);
        }
    }

    const compTurn = function(){ 
        const tileArray = document.querySelectorAll('.tile');
        let randNum = Math.floor((Math.random()*9)+1);
        currentTile = tileArray[randNum-1];
        if  (currentTile.querySelector('p').innerHTML != '') currentTile = compTurn();
        return currentTile;
    }

    const winstate = function(currentTile){
        //add a tie check
        if(    (grid[0][0] == playerchoice && grid[0][1] == playerchoice && grid[0][2] == playerchoice)
            || (grid[1][0] == playerchoice && grid[1][1] == playerchoice && grid[1][2] == playerchoice) 
            || (grid[2][0] == playerchoice && grid[2][1] == playerchoice && grid[2][2] == playerchoice) 
            || (grid[0][0] == playerchoice && grid[1][0] == playerchoice && grid[2][0] == playerchoice) 
            || (grid[0][1] == playerchoice && grid[1][1] == playerchoice && grid[2][1] == playerchoice) 
            || (grid[0][2] == playerchoice && grid[1][2] == playerchoice && grid[2][2] == playerchoice) 
            || (grid[0][0] == playerchoice && grid[1][1] == playerchoice && grid[2][2] == playerchoice) 
            || (grid[0][2] == playerchoice && grid[1][1] == playerchoice && grid[2][0] == playerchoice)) 
            gamestate = false;
            if (currentTile.querySelector('p').innerHTML == playerchoice) winner = 'You are the winner!';
            else if(currentTile.querySelector('p').innerHTML == computerchoice) winner == 'The computer took this round...';
        return;
    }

    const endScreen = function(){
        //add the wintext, losetext, or tie text to the screen
        //+ 2 buttons that decide whether the select screen or game screen is loaded
    }
    return {select};
}();

game.select();