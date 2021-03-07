onmessage = function(e){
    const result = e.data[0] * e.data[1];
    if(result === 100){
        throw new Error("some error")
        // close();
    }
    if(isNaN(result)){
        postMessage('Please write two numbers');
    }else{
        postMessage(result);
    }
}
onerror = function(e){
    console.log(e);
}