"use strict"

// 로그인, 회원가입 기능하는 모델

const UserStorage = require("./UserStorage")
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { resolve } = require("path");
const { rejects } = require("assert");


class User{
    constructor(body){
        this.body = body;
    }
    
    async login(){
        try{
            const userInfo = this.body;
            const { id, psword } = await UserStorage.getUserInfo(userInfo.id); 
            if(id){ // 전달한 아이디가 유저스토리지에 있으면
                if(id===userInfo.id && psword === userInfo.psword){ // 그 아이디가 프론트에서 전달한 아이디와 비밀번호가 같은지 물어본다.
                    return { success : true, msg : "로그인 성공"};
                }
                return { success : false, msg : "비밀번호가 틀렸습니다"} // 아이디만 같을때 리턴
            }
            return { success : false, msg : "존재하지 않는 아이디입니다"} // 아이디도 틀릴때 리턴
        } catch(err){
            return { success : false, err };
        }
        // await은 'promise를 반환'하는 애한테 주는 옵션!
        
    }

    async register(){
        try {
            const userInfo = this.body
            const response = await UserStorage.save(userInfo); // 유저스토리지에 세이브라는 메소드를 호출하여 저장될 수 있도록 해줌
            return response;
            
        } catch(err){
            return { success : false, err };
        }
    }

}

module.exports = User;