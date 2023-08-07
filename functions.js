
function time(){    
    timer--; 
    document.getElementById('time').innerHTML=timer;
    if(timer<1) {
        clearInterval(timerid);
    }
}