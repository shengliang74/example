var express = require('express');
var router = express.Router();
let path = require('path')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// 水印
router.get('/watermark', function (req, res, next) {
  res.render(path.join(__dirname, '../public/pages/watermark/index'), {
    title: '我是订单列表页',
    content: '<h2>我是标题2</h2>',
    person: {
      name: '张三',
      age: 20,
      sex: true,
      fav: ['读书', '听音乐', '唱歌']
    }
  });
});

// Web Worker
// 专用web worker
router.get('/simpleWorker', function (req, res, next) {
  res.render(path.join(__dirname, '../public/pages/webWorker/simpleWorker.ejs'), {title:""});
});

// 共享web worker1
router.get('/shareWorker', function (req, res, next) {
  res.render(path.join(__dirname, '../public/pages/webWorker/shareWorker.ejs'), {title:""});
});

// 共享web worker2
router.get('/shareWorker2', function (req, res, next) {
  res.render(path.join(__dirname, '../public/pages/webWorker/shareWorker2.ejs'), {title:""});
});

// canvas 压缩图片
router.get('/canvasCompress', function (req, res, next) {
  res.render(path.join(__dirname, '../public/pages/canvasCompress/index.ejs'), {title:""});
});

// 
module.exports = router;
