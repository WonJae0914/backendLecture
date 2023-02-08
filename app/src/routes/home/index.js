"use strict"

const express = require("express"); // express 모듈 불러오기
const router = express.Router();    // router 변수에 라우터값 불러오기
const ctrl = require("./home.ctrl");// ctrl 변수에 컨트롤러값(home, login) 불러오기

router.get('/', ctrl.output.home);          // 함수에 값 담기       
router.get('/login', ctrl.output.login);
router.get('/register', ctrl.output.register);

// 프론트 단에서 req 받은 값을 서버로 보내주는 API
router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);

module.exports=router;              // router 내보내기 