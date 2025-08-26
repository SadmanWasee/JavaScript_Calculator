const display = document.getElementById("display");

function cleardisplay(){
    display.value ="";
}

function addtodisplay(character) {
    display.value += character;
}

function calculate(){
    try{
        display.value=""+ eval(display.value)
    }catch(err){
        display.value = err
    }
}