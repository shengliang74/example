const number1 = document.querySelector("#number1");
const number2 = document.querySelector("#number2");
const result = document.querySelector('.result');


if (window.Worker) {
    const myWorker = new Worker("http://localhost:3000/pages/webWorker/webWorker.js");
    number1.onchange = function () {
        myWorker.postMessage([number1.value, number2.value]);
    }
    number2.onchange = function () {
        myWorker.postMessage([number1.value, number2.value]);
    }
    myWorker.onmessage = function (e) {
        console.log(e);
        result.textContent = e.data;
    }
}