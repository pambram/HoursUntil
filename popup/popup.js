// ##
// HoursUntil - A bare-minimum quick tool that, believe it or not, needed quite a few steps to do before this existed...
// Pablo Ambram - v1 - Oct 2022
// GNU Public License
// ####
//


// set the value of the Inputbox to now
today = new Date().toISOString().slice(0, 16);

// Set minimum and step intervals (these intervals of are only honored if cycling with keyboard up and down through time)
const inputBox = document.getElementById('meeting-time')
inputBox.value = today
inputBox.setAttribute('min', today);
inputBox.setAttribute('step', 1800);   //30 min interval = 1800s

//Calculate the hours too if Enter is pressed while on the input box
inputBox.addEventListener("keypress", runScript);

function runScript(e) {
    if (e.keyCode === 13) {
        Calculate(new Date(inputBox.value))
    } else {
        return false;
    }
}


function addHours(numOfHours, date = new Date()) {
    let tempCorr = 0;

    if (numOfHours < 0) {
        tempCorr = 24
        // numOfHours=Math.abs(numOfHours);
        visibility = 'visible'
    }
    date.setTime(date.getTime() + (tempCorr + numOfHours) * 60 * 60 * 1000);
    return date;
}


//Bind all the calculation buttons to the Calculate function
let calculateButtons = []
calculateButtons = document.getElementsByClassName('Calculate');

for (let i = 0; i < calculateButtons.length; i++) {
    if (calculateButtons[i].dataset.starttimeutc) {
        const shiftHour = calculateButtons[i].dataset.starttimeutc;
        const thisDate = new Date();
        let fd = new Date(addHours(shiftHour - thisDate.getHours()));

        calculateButtons[i].addEventListener("click", () => {
            Calculate(fd);
        });
    } else {
        calculateButtons[i].addEventListener("click", () => {
            Calculate();
        });
    }
}

//const calcButton = document.getElementById('calc')


function diff_hours(dt1, dt2) {
    var diff = (dt1.getTime() - dt2.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}

function Calculate(futureDate) {
    let fd = futureDate || new Date(inputBox.value);

    dt1 = new Date();
    dt2 = fd

    let result = diff_hours(dt1, dt2);

    // It makes it easier (to my eyes) to have a random colored output every time I run the calc, so I know
    // when the previous result shown is no longer current. Maybe it's not needed... but it's nice, in a way.
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const resultLabel = document.getElementById('result')
    resultLabel.innerHTML = result + ' hours';
    resultLabel.setAttribute('style', 'color:#' + randomColor)
}