const textToImg = function(text){
    const fontSize = 60;
    const canvasDom = document.getElementById('canvas');
    canvasDom.width = 120;
    canvasDom.height = 120;
    const context = canvasDom.getContext('2d');
    context.fillStyle="rgba(255,255,255,.1)";
    context.fillRect(0,0,canvasDom.width, canvasDom.height)
    context.fillStyle="red";
    context.font = '30px Arial';
    context.textAlign = "center";
    context.fillText(text, fontSize, fontSize);
    return canvasDom.toDataURL("image/png")
}
const imgSrc = textToImg('Hello World');
document.getElementById('watermark').style=`background: url(${imgSrc});`;