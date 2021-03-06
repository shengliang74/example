const fs = require('fs');
const path = require('path');

// const distPath = path.normalize(__dirname + '/../dist');
const distPath = path.normalize(__dirname + '/dist');
const distFiles =  fs.readdirSync(distPath)

let haveStatic = false;
let haveIndex = false;
if(distFiles && distFiles.length > 0){
    distFiles.forEach( function (file){
        if(file === 'index.html'){
            haveIndex = true;

        }
        if(file === 'static'){
            haveStatic = true;
        }
    });
}

// const staticPath = path.normalize(__dirname + '/../../src/main/resources/static');
const staticPath = path.normalize(__dirname + '/resources/static');
const staticFiles = fs.readdirSync(staticPath);

console.log(staticFiles);
let hasStatic = false;
let hasIndex = false;
if(staticFiles && staticFiles.length > 0){
    staticFiles.forEach( function (file){
        if(file === 'index.html'){
            hasStatic = true;
        }
        if(file === 'static'){
            hasIndex = true;
        }
    });
}

if(!haveStatic || !haveIndex){
    console.error('dist下没有static或index.html文件')
    return
}
if(!hasStatic || !hasIndex){
    console.error('目标static下没有static或index.html文件')
    return
}

const deleteFile = function(path){
    var files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach(item=>{
            var newPath = path + '/' +item;
            if(fs.statSync(newPath).isDirectory()){
                deleteFile(newPath)
            }else{
                fs.unlinkSync(newPath)
            }
        })
        fs.rmdirSync(path)
    }
}

// 删除旧的static
console.log(path.join(staticPath, '/static'));
const delStatic = path.join(staticPath, '/static');
deleteFile(delStatic)