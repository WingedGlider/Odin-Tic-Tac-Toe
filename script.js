const game = function () {
    let grid = [];
    let playerchoice;
    let computerchoice;
    let winner;
    let gamestate;
    let wincombo;
    let modal = document.querySelector('dialog');
    modal.remove();
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
        grid = [];
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
        winstate(playerchoice);
        if (gamestate != false){
            currentTile = compTurn();
            currentTile.querySelector('p').innerHTML = computerchoice;
            addTile(currentTile, computerchoice)
            winstate(computerchoice); 
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

    const winstate = function(choice){
        const gridArray = [];
        grid.forEach(array => array.forEach(cell => gridArray.push(cell)));
        let fullcheck = true;
        gridArray.forEach(tile => {if(tile == '') fullcheck = false});
        if(    (grid[0][0] == choice && grid[0][1] == choice && grid[0][2] == choice)){
            wincombo = '123';
            gamestate = false;
        }
        else if (grid[1][0] == choice && grid[1][1] == choice && grid[1][2] == choice){
            wincombo = '456';
            gamestate = false;
        }
        else if (grid[2][0] == choice && grid[2][1] == choice && grid[2][2] == choice){
            wincombo = '789';
            gamestate = false;
        }
        else if (grid[0][0] == choice && grid[1][0] == choice && grid[2][0] == choice){
            wincombo = '147';
            gamestate = false;
        }
        else if (grid[0][1] == choice && grid[1][1] == choice && grid[2][1] == choice){
            wincombo = '258';
            gamestate = false;
        }
        else if (grid[0][2] == choice && grid[1][2] == choice && grid[2][2] == choice){
            wincombo = '369';
            gamestate = false;
        } 
        else if (grid[0][0] == choice && grid[1][1] == choice && grid[2][2] == choice){
            wincombo = '159';
            gamestate = false;
        }
        else if(grid[0][2] == choice && grid[1][1] == choice && grid[2][0] == choice){
            wincombo = '357';
            gamestate = false;
        }else if(fullcheck){
            gamestate = false;
            wincombo = 'none';
        }
            if (choice == playerchoice) winner = 'You are the winner!';
            else if(choice == computerchoice) winner = 'The computer took this round...';
            if (fullcheck && wincombo == 'none') winner = 'Game ended with a tie...';
            if (gamestate == false) endScreen();
        return;
    }

    const endScreen = function(){
        const gridArray = [];
        const tileArray = [];
        grid.forEach(array => array.forEach(cell => gridArray.push(cell)));
        let iterator = 0;
        document.querySelector('.gameboard').innerHTML = '';
        for(let i = 0; i < 3; i++){
            document.querySelector('.gameboard').innerHTML += '<div></div>';
            for(let j = 0; j < 3; j++){
                document.querySelector('.gameboard>div:nth-child('+(i+1)+')').innerHTML += '<div class=tile><p>'+gridArray[iterator]+'</p></div>';
                tileArray.push(document.querySelector('div:nth-child('+(i+1)+')>.tile:nth-child('+(j+1)+')'));
                if(iterator+1 == wincombo.charAt(j) || iterator+1 == wincombo.charAt(i)) tileArray[iterator].classList.add('active-tile');
                iterator++;
            }
        }
        document.querySelector('body').innerHTML += '<dialog data-modal>'+modal.innerHTML+'</dialog>';
        modal = document.querySelector('dialog');
        modal.showModal();
        document.querySelector('h1').innerHTML = winner;
        modal.querySelector('button:nth-child(1)').addEventListener('click', () => initialize());
        modal.querySelector('button:nth-child(2)').addEventListener('click', () => select());
    }
    return {select};
}();

game.select();