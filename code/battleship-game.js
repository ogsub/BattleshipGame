window.onload = function(){
    
 
    function addNameMessage(){
        if (typeof localStorage.getItem('player1') !== 'undefined') {
            var name = document.createElement('div');
            var name = document.createElement('div');
            name.innerHTML = localStorage.getItem('player1') + "'s turn!";
            name.classList.add('centerText'); 
            name.classList.add('topPadding');  
            document.body.insertBefore(name, document.getElementById('twoBoards'));//append(name);
        }
    }

    addNameMessage();
    
    var table1 = document.getElementsByClassName('setupBoard')[0];
    var table2 = document.getElementsByClassName('setupBoard')[1];
    var grid1 = JSON.parse(localStorage.getItem('grid1'));
    var grid2 = JSON.parse(localStorage.getItem('grid2'));
    var boats1 = JSON.parse(localStorage.getItem('boats1'));
    var boats2 = JSON.parse(localStorage.getItem('boats2'));
    var tries1 = new Array(100);
    tries1.fill(-1);
    var tries2 = new Array(100);
    tries2.fill(-1);
    var numEnemyUnits1 = 10;
    var numEnemyUnits2 = 10;
    var currentGrid = grid1;
    var currentTries = tries1;
    var secondaryGrid = grid2;
    var secondaryTries = tries2;
    var currentBoats = boats2;
    var currentEnemyUnits = numEnemyUnits2;
    var secondaryUnits = numEnemyUnits1;
    var blocked = false;
    
    function addMyGrid(){
       for(var i = 0; i < 100; i++){
            var divEl = document.createElement('div');
            divEl.classList.add('boardBlocks');
            divEl.id = "class" + i;
            table1.append(divEl);
        }
        for(var i = 0; i < 100; i++){
            if(currentGrid[i] != -1){
                var divEl = document.getElementById("class" + i);
                divEl.classList.add('boatPlaced' + currentGrid[i]);
            }
        }
    }
    
    addMyGrid();
    
    function switchColorGrid(){
        for(var i = 0; i < 100; i++){

                 document.getElementById("class" + i).classList.remove("boatPlaced" + secondaryGrid[i]);
            if(currentGrid[i] != -1){
                var divEl = document.getElementById("class" + i);
                divEl.classList.add('boatPlaced' + currentGrid[i]);
            }
        }
    }
    
    function switchColorTries(){
        for(var i = 0; i < 100; i++){

                var element = document.getElementById("classTry" + i);
                element.classList.remove("boatHit");
                element.classList.remove("boatMissed");
                element.classList.remove("boatSank");
   
            if(currentTries[i] != -1){
                var divEl = document.getElementById("classTry" + i);
                divEl.classList.add(currentTries[i]);
            }
        }
    }
    
    function changeName(){
        var name = document.getElementsByClassName("centerText")[0];
        if(currentGrid == grid1){
            name.innerHTML = localStorage.getItem('player1') + "'s turn!";
        }
        else{
            name.innerHTML = localStorage.getItem('player2') + "'s turn!";
        }
    }
    
    function switchTurns(){
        blocked = false;
        if(currentGrid == grid1){
            currentGrid = grid2;
            currentTries = tries2;
            secondaryGrid = grid1;
            secondaryTries = tries1;
            currentBoats = boats1;
            numEnemyUnits2 = currentEnemyUnits;
            currentEnemyUnits = numEnemyUnits1;
            secondaryUnits = numEnemyUnits2;
        }
        else{
            currentGrid = grid1;
            currentTries = tries1;
            secondaryGrid = grid2;
            secondaryTries = tries2;
            currentBoats = boats2;
            numEnemyUnits1 = currentEnemyUnits;
            currentEnemyUnits = numEnemyUnits2;
            secondaryUnits = numEnemyUnits1;
        }
        switchColorGrid();
        switchColorTries();
        changeName();
    }
    
    function checkSinkedShips(){
        var wholeBoat = true;
        var wholeBoatFields = new Array();
        for(var i = 0, len = currentBoats.length; i < len; i++){   //currentBoats.forEach((boat)=>{
            var boat = currentBoats[i];
            for(var j = 0, len2 = boat.length;  j < len2; j++){            //boat.forEach((b)=>{
                b = boat[j];
                if(!(currentTries[parseInt(b.slice(5))] == "boatHit")){
                    wholeBoat = false;
                    wholeBoatFields.length = 0;
                    break;
                }
                else{
                    wholeBoat = true;
                    wholeBoatFields.push(b);                                                                   
                }
            }
            if(wholeBoat == true && wholeBoatFields.length != 0)
                break;
        }
        if(wholeBoatFields.length > 0){
            currentEnemyUnits--;
            wholeBoatFields.forEach((boatField)=>{
                document.getElementById("classTry" + boatField.slice(5)).classList.add("boatSank");
                document.getElementById("classTry" + boatField.slice(5)).classList.remove("boatHit");
                currentTries[parseInt(boatField.slice(5))] = "boatSank";
            });
        }
    }
    
    function addMyTries(){
       for(var i = 0; i < 100; i++){
           var divEl = document.createElement('div');
           divEl.classList.add('boardBlocks');
           divEl.id = "classTry" + i;
           divEl.addEventListener("click", (e)=>{
               if(!blocked){
                    mouseClickID = parseInt(e.currentTarget.id.slice(8));
                   if(secondaryGrid[mouseClickID] != -1 && currentTries[mouseClickID] == -1){
                       e.target.classList.add("boatHit");
                       currentTries[mouseClickID] = "boatHit";
                       checkSinkedShips();
                       //currentEnemyUnits--;
                       if(currentEnemyUnits == 0){
                            var myWindow = window.open("", "", "width=200,height=100");
                            var win= "<div>You wone! You have " + secondaryUnits + " units left</div>";
                            myWindow.document.write(win);
                            blocked = true;
                       }
                   }
                   else if (currentTries[mouseClickID] == -1){
                       e.target.classList.add("boatMissed");
                       currentTries[mouseClickID] = "boatMissed";
                       blocked = true;
                       setTimeout(switchTurns, 1000);
                   }
               }
           });
           ///////////////////////////////////////////
            //dodati polja da vidim kako sam pokusavao
            //dodati funckiju koja proverava pa na osnovu toga odredjuje koji stil cu da dodam polju.
           table2.append(divEl);
        }
    }
    
    addMyTries();
}