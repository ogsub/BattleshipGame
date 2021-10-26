window.onload = function(){
    var regex = /^\w{3,15}$/;
    var inputs = document.querySelectorAll('input[type="text"]'); 
    var form = document.forms[0];
    var player1;
    var player2;
    
    function validate(textField, regex){
        /*alert(textField.value);*/
        if(regex.test(textField.value)){
            textField.className = 'valid';
            return true;
        } else {
            textField.className = 'invalid';
            return false;
        }
    }

    inputs.forEach((input)=>{
        input.addEventListener('keyup', (e)=>{
            validate(e.target, regex)
        })
    });
    
    form.addEventListener('submit', (e)=>{
        if( !(validate(inputs[0], regex) && validate(inputs[1], regex)) )
            e.preventDefault();
        else{
            localStorage.setItem("player1", inputs[0].value);
            localStorage.setItem("player2", inputs[1].value);
        }
    })
    
}