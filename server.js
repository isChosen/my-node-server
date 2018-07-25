let express = require('express');
let bodyParser = require('body-parser');

let app = express();
const port = '8024';
const hostName = '127.0.0.1';

// 模拟数据
const data = [
  {id: 1, name: 'data-1', gender: 'female', age: 20},
  {id: 2, name: 'data-2', gender: 'male', age: 21},
  {id: 3, name: 'data-3', gender: 'female', age: 22},
  {id: 4, name: 'data-4', gender: 'male', age: 23},
  {id: 5, name: 'data-5', gender: 'female', age: 24},
  {id: 6, name: 'data-6', gender: 'male', age: 25},
  {id: 7, name: 'data-7', gender: 'female', age: 20},
  {id: 8, name: 'data-8', gender: 'female', age: 19},
  {id: 9, name: 'data-9', gender: 'male', age: 18},
  {id: 10, name: 'data-10', gender: 'male', age: 17},
  {id: 11, name: 'data-11', gender: 'male', age: 24},
  {id: 12, name: 'data-12', gender: 'female', age: 21},
  {id: 13, name: 'data-13', gender: 'male', age: 20},
  {id: 14, name: 'data-14', gender: 'female', age: 19},
  {id: 15, name: 'data-15', gender: 'female', age: 18},
  {id: 16, name: 'data-16', gender: 'female', age: 20},
  {id: 17, name: 'data-17', gender: 'female', age: 24},
  {id: 18, name: 'data-18', gender: 'male', age: 27},
  {id: 19, name: 'data-19', gender: 'female', age: 23},
  {id: 20, name: 'data-20', gender: 'male', age: 21},
  {id: 21, name: 'data-21', gender: 'female', age: 20},
  {id: 22, name: 'data-22', gender: 'male', age: 19},
  {id: 23, name: 'data-23', gender: 'male', age: 20},
  {id: 24, name: 'data-24', gender: 'female', age: 19},
  {id: 25, name: 'data-25', gender: 'female', age: 18},
  {id: 26, name: 'data-26', gender: 'male', age: 20},
  {id: 27, name: 'data-27', gender: 'female', age: 24},
  {id: 28, name: 'data-28', gender: 'male', age: 27},
  {id: 29, name: 'data-29', gender: 'female', age: 23},
  {id: 30, name: 'data-30', gender: 'male', age: 21},
  {id: 31, name: 'data-31', gender: 'female', age: 20},
  {id: 32, name: 'data-32', gender: 'male', age: 21},
  {id: 33, name: 'data-33', gender: 'female', age: 22},
  {id: 34, name: 'data-34', gender: 'male', age: 23},
  {id: 35, name: 'data-35', gender: 'female', age: 24},
  {id: 36, name: 'data-36', gender: 'male', age: 25},
  {id: 37, name: 'data-37', gender: 'female', age: 20},
  {id: 38, name: 'data-38', gender: 'female', age: 19},
  {id: 39, name: 'data-39', gender: 'male', age: 18},
  {id: 40, name: 'data-40', gender: 'male', age: 17},
  {id: 41, name: 'data-41', gender: 'male', age: 24},
  {id: 42, name: 'data-42', gender: 'female', age: 21},
  {id: 43, name: 'data-43', gender: 'male', age: 20},
  {id: 44, name: 'data-44', gender: 'female', age: 19},
  {id: 45, name: 'data-45', gender: 'female', age: 18},
  {id: 46, name: 'data-46', gender: 'male', age: 20},
  {id: 47, name: 'data-47', gender: 'female', age: 24},
  {id: 48, name: 'data-48', gender: 'male', age: 27},
  {id: 49, name: 'data-49', gender: 'female', age: 23},
  {id: 50, name: 'data-50', gender: 'male', age: 21},
  {id: 51, name: 'data-51', gender: 'female', age: 20},
  {id: 52, name: 'data-52', gender: 'male', age: 19},
  {id: 53, name: 'data-53', gender: 'male', age: 20},
  {id: 54, name: 'data-54', gender: 'female', age: 19},
  {id: 55, name: 'data-55', gender: 'female', age: 18},
  {id: 56, name: 'data-56', gender: 'female', age: 20},
  {id: 57, name: 'data-57', gender: 'female', age: 24},
  {id: 58, name: 'data-58', gender: 'male', age: 27},
  {id: 59, name: 'data-59', gender: 'female', age: 23},
  {id: 60, name: 'data-60', gender: 'male', age: 24},
  {id: 61, name: 'data-61', gender: 'female', age: 23},
  {id: 62, name: 'data-62', gender: 'female', age:18},
  {id: 63, name: 'data-63', gender: 'female', age: 19}
]
// 定义全局变量
const totalRecords = data.length;
let totalPages, curr, per_page;

// 添加 body-parser 中间件解析 post 请求的 json 参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json;charset=UTF-8');
  next();
});

// post 请求
app.post('/getUsers', function(req, res) {
  const params = req.body;
  curr = Number(params.page);
  per_page = Number(params.per_page);
  totalPages = Math.ceil(totalRecords / per_page);
  const arr = data.slice((curr-1)*per_page, curr*per_page);
  setTimeout(() => {
    res.send({
      curr,
      totalRecords,
      totalPages,
      data: arr
    });
  }, 1000);
})

app.get('/getAll', function(req, res) {
  console.log('query: ', req.query);
  res.send(data);
})

app.listen(port, hostName, function() {
  console.log(`服务器运行在 http://${hostName}:${port}`);
});
