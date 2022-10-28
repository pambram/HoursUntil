//
//init code
//

// set the value of the Inputbox to right now
today = new Date().toISOString().slice(0,16);
// set other parameters
document.getElementById('meeting-time').value= today
document.getElementById('meeting-time').setAttribute('min', today);
document.getElementById('meeting-time').setAttribute('step', 900);
//bind the click event to the Calculate button, because of stupid manifest v3 rules I can't put inline event handlers
// <button id="btn" onclick="doSomething()"></button>
document.getElementById("calc").addEventListener("click", Calculate);




function diff_hours(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}

function Calculate() {
    var myTime = document.getElementById("meeting-time");
    var str = myTime.value;
    var d = new Date(str);

    dt1 = new Date();
    dt2=d

    let result = diff_hours(dt1, dt2);

    var randomColor = Math.floor(Math.random()*16777215).toString(16);

    document.getElementById('result').innerHTML = result + ' hours';
    document.getElementById('result').setAttribute('style',
        'color:#'+randomColor)
}