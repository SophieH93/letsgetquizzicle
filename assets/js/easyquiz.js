const stringMinutes = 15;
let time = startingMinutes = 60;

const countDownEl = document.getElementById("count");

setInterval(updateCountDown, 1000);

function updateCountDown(){
    const minutes =  Math.floor(time / 60);
    let seconds = time % 60;

    countDownEl.innerHTML = `${minutes} - ${seconds}`;
    time--;

}