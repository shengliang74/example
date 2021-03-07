onconnect = function(e) {
    var port = e.ports[0];
    port.start(); // worker线程中的调用, 假设port变量代表一个端口
  
    port.onmessage = function(e) {
      var workerResult = 'Result: ' + (e.data[0] * e.data[1]);
      console.log(workerResult)
      port.postMessage(workerResult);
    }
  }

  onerror = function(e){
    console.log(e);
}