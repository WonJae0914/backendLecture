"use strict"

const app = require("../app"); // app.js 당겨오기 

//포트번호
const PORT = 3000;

app.listen(PORT, ()=>{                  // listen : 서버 포트값 받아오는 메소드. 3000번 포트로 접속
    console.log("서버 접속!");           // 접속 성공 시 console 창에 띄울 메세지 
})
;