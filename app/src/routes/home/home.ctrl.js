"use strict"

const User = require("../../models/User");
const logger = require("../../config/logger");

// 단순히 해당 페이지를 렌더링 해주는 페이지
const output = {
    home : (req, res)=>{       
        logger.info(`GET / 304 "홈 화면으로 이동"`);  
        res.render("home/index");           
    },

    login : (req, res)=>{        
        logger.info(`GET /login 304 "로그인 화면으로 이동"`);   
        res.render("home/login");
    },

    register : (req, res) =>{
        logger.info(`GET /register 304 "회원가입 화면으로 이동"`);  
        res.render("home/register")
    },
};

// 프론트에서 요청 받은 값 서버로 보낼 함수
const process = {
    login : async(req, res) =>{
        const user = new User(req.body); // 프론트에서 입력한 값을 파라미터로 넘김
        const response = await user.login();   // user.~~를 불러오면 req한 body값을 항상 가지고 다님.
        const url = {
            method : "POST",
            path : "/login",
            status : response.err ? 400 : 200,
        }
        log(response, url);
        return res.status(url.status).json(response);
    },

     register : async (req,res) => {
        const user = new User(req.body); // 프론트에서 입력한 값을 파라미터로 넘김
        const response = await user.register();   // user.~~를 불러오면 req한 body값을 항상 가지고 다님.
        const url = {
            method : "POST",
            path : "/register",
            status : response.err ? 409 : 201,
        }
        log(response, url);
        return res.status(url.status).json(response);
    }
};

module.exports = { // 오브젝트 타입으로도 내보낼 수 있음 
   output,
   process,     // key : value(=key) 가 된다. 
}

const log = (response, url) =>{
    if(response.err) {
        logger.error(`${url.method}${url.path} ${url.status} Response : ${response.success} ${response.err}"`)
    } else {
        logger.info(`${url.method}${url.path} ${url.status} Response : ${response.success} ${response.msg || "" }"`);
    };
        
};