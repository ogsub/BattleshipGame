window.onload = function(){
    var table = document.getElementById("setupWrapper").getElementsByClassName("setupBoard")[0];
    
    var grid1 = new Array(100);
    grid1.fill(-1);
    
    var grid2 = new Array(100);
    grid2.fill(-1);
    
    var currentGrid = grid1;
    var mouseDownID = -1;
    var mouseUpID = -1;
    
    var boats1 = new Array();
    var boats2 = new Array();
    var currBoats = boats1;
    
    function checkTaken(grid, index){
        if(grid[index] == -1)
            return false;
        return true;
    }

    
    function eraseColorGrid(){
        for(var i = 0; i < 100; i++){
            if(grid1[i] != -1)
                 document.getElementById("class" + i).classList.remove("boatPlaced" + grid1[i]);
        }
    }
    
    function setNumUnits(){
        for(var i = 1; i < 5; i++)
            document.getElementById("num" + i).innerHTML = 5 - i;
    }
    
    function secondPlayer(){
        numOfUnits = 10;
        changeName();
        eraseColorGrid();
        setNumUnits();
        currentGrid = grid2;
        currBoats = boats2;
    }
    
    function color(currGrid){
        var rowNoStart = Math.floor(mouseDownID/10);
        var colNoStart = mouseDownID % 10;
        var rowNoEnd   = Math.floor(mouseUpID/10);
        var colNoEnd   = mouseUpID % 10;
        var boat = new Array();
        
        if(rowNoStart == rowNoEnd && Math.abs(colNoStart - colNoEnd) == (unitSize - 1)){
            var index = Math.min(mouseDownID, mouseUpID);
            for(var i = 0; i < unitSize; i++){
                if(checkTaken(currGrid, index + i))
                    return;
            }
            for(var i = 0; i < unitSize; i++){
                currGrid[index + i] = unitSize;
                document.getElementById("class" + (index + i)).classList.add("boatPlaced" + unitSize);
                boat.push("class" + (index + i));
            }
            numOfUnits--;
            let tmp = parseInt(document.getElementById("num" + unitSize).innerHTML);
            document.getElementById("num" + unitSize).innerHTML = --tmp;
        }
        else if(colNoStart == colNoEnd && Math.abs(rowNoStart - rowNoEnd) == (unitSize - 1)){
            var index = Math.min(mouseDownID, mouseUpID);
            for(var i = 0; i < unitSize; i++){
                if(checkTaken(currGrid, index + i * 10))
                    return;
            }
            for(var i = 0; i < unitSize; i++){
                currGrid[index + i * 10] = unitSize;
                document.getElementById("class" + (index + i * 10)).classList.add("boatPlaced" + unitSize);
                boat.push("class" + (index + i * 10));
            }
            numOfUnits--;
            let tmp = parseInt(document.getElementById("num" + unitSize).innerHTML);
            document.getElementById("num" + unitSize).innerHTML = --tmp;
        }
        if(boat != null)
            currBoats.push(boat);
        
        mouseDownID = -1;
        if(numOfUnits == 0 && currGrid != grid2)
            setTimeout(secondPlayer, 1000);
        else if(numOfUnits == 0) {
            localStorage.setItem("grid1", JSON.stringify(grid1));
            localStorage.setItem("grid2", JSON.stringify(grid2));
            localStorage.setItem("boats1", JSON.stringify(boats1));
            localStorage.setItem("boats2", JSON.stringify(boats2));
            setTimeout(() => {
                window.location.href = "battleship-game.html";
            }, 1000);
        }

    }
    
    function addGrid(){
        for(var i = 0; i < 100; i++){
            var divEl = document.createElement('div');
            divEl.classList.add('boardBlocks');
            divEl.id = "class" + i;
            divEl.addEventListener("mousedown", (e)=>{
                if(unitSize != null && parseInt(document.getElementById("num" + unitSize).innerHTML) > 0){
                    mouseDownID = parseInt(e.currentTarget.id.slice(5));
                }
            });
            divEl.addEventListener("mouseup", (e)=>{
               if(unitSize != null && parseInt(document.getElementById("num" + unitSize).innerHTML) > 0){
                    if(mouseDownID != -1){
                        mouseUpID = parseInt(e.currentTarget.id.slice(5));
                        color(currentGrid);
                    }
                }
            });
            table.append(divEl);
        }
    }
    
    addGrid();
    
    var tableHlp = document.getElementById("setupWrapper").getElementsByClassName("setupUnits")[0];    
    
    function addNameMessage(){
        if (typeof localStorage.getItem('player1') !== 'undefined') {
            var name = document.createElement('div');
            name.innerHTML = "Welcome " + localStorage.getItem('player1') + "! Position your battleships!";
            name.classList.add('centerText');    
            document.body.insertBefore(name, document.getElementById('setupWrapper'));//append(name);
        }
    }
    
    addNameMessage();
    
    function changeName(){
       if (typeof localStorage.getItem('player2') !== 'undefined') { 
           document.getElementsByClassName('centerText')[0].innerHTML = "Welcome " + localStorage.getItem('player2') + "! Position your battleships!";
       }
    }
    
    var unitSize;
    var numOfUnits = 10;
    
    document.getElementById("unit1").addEventListener("click", (e)=>{
        unitSize = 1;
        document.getElementById("unit1").classList.add("unit1Active")
        for(var i = 1; i < 5; i++){
            if(i == 1)
                continue;
            document.getElementById("unit" + i).classList.remove("unit" + i + "Active")
        }
        //alert(1);
    });
    
    document.getElementById("unit2").addEventListener("click", (e)=>{
        unitSize = 2;
        document.getElementById("unit2").classList.add("unit2Active")
        for(var i = 1; i < 5; i++){
            if(i == 2)
                continue;
            document.getElementById("unit" + i).classList.remove("unit" + i + "Active")
        }
        //alert(2);
    });
    
    document.getElementById("unit3").addEventListener("click", (e)=>{
        unitSize = 3;
        document.getElementById("unit3").classList.add("unit3Active")
        for(var i = 1; i < 5; i++){
            if(i == 3)
                continue;
            document.getElementById("unit" + i).classList.remove("unit" + i + "Active")
        }
        //alert(3);
    });
    
    document.getElementById("unit4").addEventListener("click", (e)=>{
        unitSize = 4;
        document.getElementById("unit4").classList.add("unit4Active")
        for(var i = 1; i < 5; i++){
            if(i == 4)
                continue;
            document.getElementById("unit" + i).classList.remove("unit" + i + "Active")
        }
        //alert(4);
    });
    
    
}