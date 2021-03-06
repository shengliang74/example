var xlsx = require('node-xlsx');
var fs = require('fs');
var sheets = xlsx.parse('./test/scan.xlsx');//获取到所有sheets
var scanDesc = require("./test/scanDesc.js"); 

var arr = [];
//sheets是一个数组，数组中的每一项对应test.xlsx这个文件里的多个表格，如sheets[0]对应test.xlsx里的“测试参数”这个表格，
sheets.forEach(function(sheet){
    var newSheetsArr = [];
    //sheet是一个json对象，格式为{name:"测试参数",data:[]},我们想要的数据就存储在data里
    for(var i=3; i<sheet["data"].length; i++){ //execl文件里的表格一般有标题所以不一定从0开始
        var row=sheet['data'][i];
        if(row && row.length > 0){
            newSheetsArr.push({
                qrCode: row[5] && row[5].replace(/\s/g,''), //部分文本尾部可能会有空格，要去除
                allianceid: row[2],
                sid: row[3],
                ouid: row[4],
                codevalue: row[0],
            });
        }
    }
   arr.push(newSheetsArr);
});

var newSheetsArr = arr[0];
var dataArr = [];
for(var j in scanDesc.config){
    for(var f in scanDesc.config[j]){
        dataArr.push(scanDesc.config[j][f])
    }
}

var errArr = [];
var errArr1 = [];
var errArr2 = [];
var h = 0;
while(h<dataArr.length){
    for(var z=0; z<newSheetsArr.length; z++){
        if(dataArr[h]["ouid"] == newSheetsArr[z]["ouid"]){
            if(dataArr[h]["sid"] ==newSheetsArr[z]["sid"]
                && dataArr[h]["allianceid"] ==newSheetsArr[z]["allianceid"]
                && dataArr[h]["qrCode"] ==newSheetsArr[z]["qrCode"]
            ){

            }else{
                console.log(dataArr[h]["sid"] ==newSheetsArr[z]["sid"]);
                console.log(dataArr[h]["allianceid"] ==newSheetsArr[z]["allianceid"]);
                console.log(dataArr[h]["qrCode"] ==newSheetsArr[z]["qrCode"]);
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
                errArr1.push(dataArr[h]);
                errArr2.push(newSheetsArr[z]);
                errArr.push(newSheetsArr[z]["ouid"]);
            }
            break
        }
    }
    h++
}

fs.writeFile("./output1.txt", JSON.stringify(errArr1), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("File saved successfully!");
});
fs.writeFile("./output2.txt", JSON.stringify(errArr2), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("File saved successfully!");
});
console.log(errArr);