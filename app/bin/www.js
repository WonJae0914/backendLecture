"use strict"

const app = require("../app"); // app.js 당겨오기 
const logger = require("../src/config/logger");
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{                  // listen : 서버 포트값 받아오는 메소드. 3000번 포트로 접속
    logger.info(`${PORT} 포트에서 서버가 가동되었습니다`);           // 접속 성공 시 console 창에 띄울 메세지 
})
;