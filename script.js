const game = function () {
    const grid = [];
    let playerchoice;
    let computerchoice;
    let gamestate;
    let winner;
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
        playerchoice = document.querySelector('.active').innerHTML.toLowerCase();
        document.querySelector('body').innerHTML = '';
        document.querySelector('body').innerHTML = '<h1>Tic-Tac-Toe</h1><div class=gameboard></div>';
        for(let i = 0; i < 3; i++){
            document.querySelector('.gameboard').innerHTML += '<div></div>';
            let array = [] 
            for(let j = 0; j < 3; j++){
                array.push('');
                document.querySelector('.gameboard>div:nth-child('+(i+1)+')').innerHTML += '<div class=tile></div>';
            }
            grid.push(array);
        }
        document.querySelectorAll('.tile').forEach(tile =>{
            tile.addEventListener('click', ()=>{
                play();
            });
        });
        if (playerchoice = 'x') computerchoice = 'o';
        else computerchoice = 'x';
    }

    const play = function(){
        //play should be passed the currently pressed div
        //inner HTML should be changed to playerchoice.toUpperCase();
        //listener should be stripped
        //grid of x/y assigned
        //winstate checked
        //if winstate, modal
        //else run player 2/computer
        gamestate = true;
        while(gamestate){
            let x = prompt('enter first index');
            let y = prompt('enter second index');
            grid[x][y] = playerchoice;
            winstate(x,y);
        }
    }

    const winstate = function(x, y){
        //add a tie check
        if(    (grid[0][0] == state && grid[0][1] == state && grid[0][2] == state) 
            || (grid[1][0] == state && grid[1][1] == state && grid[1][2] == state) 
            || (grid[2][0] == state && grid[2][1] == state && grid[2][2] == state) 
            || (grid[0][0] == state && grid[1][0] == state && grid[2][0] == state) 
            || (grid[0][1] == state && grid[1][1] == state && grid[2][1] == state) 
            || (grid[0][2] == state && grid[1][2] == state && grid[2][2] == state) 
            || (grid[0][0] == state && grid[1][1] == state && grid[2][2] == state) 
            || (grid[0][2] == state && grid[1][1] == state && grid[2][2] == state)) 
            gamestate = false;
            if (grid[x][y] == playerchoice) winner = 'player';
            else if(grid[x][y] == computerchoice) winner == 'computer';
        return;
    }
    return {initialize, select};
}();

game.select();