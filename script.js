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
        document.querySelector('button').addEventListener('click', ()=>initialize());
    }

    const initialize = function (){
        playerchoice = document.querySelector('.active').innerHTML.toLowerCase();
        document.querySelector('body').innerHTML = '';
        //create outer container
        for(let i = 0; i < 3; i++){
            //create flexbox
           let array = [] 
            for(let i = 0; i <3; i++){
                array.push('');
                //add blank div to flexbox
            }
            grid.push(array);
        }
        if (playerchoice = 'x') computerchoice = 'o';
        else computerchoice = 'x';
        play();
    }
    const play = function(){
        gamestate = true;
        while(gamestate){
            let x = prompt('enter first index');
            let y = prompt('enter second index');
            grid[x][y] = playerchoice;
            winstate(x,y);
        }
    }
    const winstate = function(x, y){
        let state = grid[x][y];
        if(    (grid[0][0] == state && grid[0][1] == state && grid[0][2] == state) 
            || (grid[1][0] == state && grid[1][1] == state && grid[1][2] == state) 
            || (grid[2][0] == state && grid[2][1] == state && grid[2][2] == state) 
            || (grid[0][0] == state && grid[1][0] == state && grid[2][0] == state) 
            || (grid[0][1] == state && grid[1][1] == state && grid[2][1] == state) 
            || (grid[0][2] == state && grid[1][2] == state && grid[2][2] == state) 
            || (grid[0][0] == state && grid[1][1] == state && grid[2][2] == state) 
            || (grid[0][2] == state && grid[1][1] == state && grid[2][2] == state)) 
            gamestate = false;
            if (state == playerchoice) winner = 'player';
            else if(state == computerchoice) winner == 'computer';
        return;
    }
    return {initialize, select};
}();

game.select();