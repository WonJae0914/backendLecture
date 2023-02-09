"use strict"

//모듈
const express = require("express");   
const dotenv = require("dotenv");

  // express 모듈 불러오기
const app = express();  
dotenv.config(); 

//라우팅 연결    
const home = require("./src/routes/home");   // routes/home 폴더의 내용들을 불러오기

// app 세팅
app.set("views", "./src/views");             // 세팅할 폴더경로 지정
app.set("view engine", "ejs");           // 엔진 세팅 
app.use(express.static(`${__dirname}/src/public`));    // 노드에서 개발 시 js,css파일을 스크립트 src 경로로 접근 하더라도 사용할 수 없다. 
                                                       // 해서 미들웨어 선언을 해서 js와 css가 접근할 수 있도록 메인 파일에 선언해야 한다. 
                                                       // express 메소드 중 static 메소드를 통해 정적경로 설정
                                                       // __dirname은 현재 app.js 파일이 있는 위치를 반환

app.use(express.json());                               // body 값을 parsing 해오기 위한 미들웨어 
app.use(express.urlencoded({ extended : true}));       // URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결

app.use("/", home)                      // use : "/"로 home 값을 보내줌. 가장 하단에 위치해야 함. 

module.exports = app;                   // 변수 app에 담긴 express 모듈 내보내기 -> www.js 파일이 가져감
