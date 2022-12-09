// app.js 실행 명령어: sudo forever start app.js
// 리스트 확인 명령어: sudo forever list
// app.js 스톱 명령어: sudo forever stop 0

// app.js

const express = require('express');
const http = require('http');
const app = express();
const path = require('path');
const server = http.createServer(app);

const { naepyeon } = require("./calc/naepyeon.js");

const fs = require('fs');
const pjson = require('./package.json');

// 라우팅

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/almanac/:year', function (req, res) {
    var almanac = naepyeon(req.params.year);
    res.render('almanac', { year: req.params.year, almanac: almanac });
});

server.listen(1281, function(){
    console.log('포트 1281에서 서버 실행중...');
});

