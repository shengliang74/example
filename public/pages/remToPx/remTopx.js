var fs = require('fs');
var readline = require('readline');

/*
* 按行读取文件内容
* 返回：字符串数组
* 参数：fReadName:文件名路径
*      callback:回调函数
* */
function readFileToArr(fReadName,callback){
    var fRead = fs.createReadStream(fReadName);
    var objReadline = readline.createInterface({
        input:fRead
    });
    var arr = new Array();
    objReadline.on('line',function (line) {
        arr.push(line);
        //console.log('line:'+ line);
    });
    objReadline.on('close',function () {
       // console.log(arr);
        callback(arr);
    });
}

readFileToArr("./test.css",function(data){
    console.log(data)
    if(data && data.length>0){
        var newData = data.map(function(item, index){
            if(item.indexOf("rem") > -1){
                return item.replace(/rem/g,"px").replace(/(\s)(\.?[0-9]+)(px)/g,function(reg,$1,$2,$3){
                    console.log(reg,$2,$3);
                    return $1+Number($2)*200+$3;
                })
            }
            return item
        })
        if(newData){
            fs.writeFile("test2.css",newData.join('\n'),function(err){
                if(err){
                    console.log(err,"写入文件失败");
                }
            })
        }
    }
})