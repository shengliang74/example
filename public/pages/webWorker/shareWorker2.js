
var number2 = document.querySelector('#number2');
var result = document.querySelector('.result');

if (!!window.SharedWorker) {
    var myWorker = new SharedWorker("http://localhost:3000/pages/webWorker/shardWebWorker.js");
    myWorker.port.start();  // 父级线程中的调用

    number2.onchange = function () {
        myWorker.port.postMessage([number2.value, number2.value]);
    }

    myWorker.port.onmessage = function (e) {
        result.textContent = e.data;
    }
}