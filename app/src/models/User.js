"use strict"

// 로그인, 회원가입 기능하는 모델

const UserStorage = require("./UserStorage")

class User{
    constructor(body){
        this.body = body;
    }
    
    login(){
        const body = this.body;
        const { id, psword } = UserStorage.getUserInfo(body.id);
        if(id){ // 전달한 아이디가 유저스토리지에 있으면
            if(id===body.id && psword === body.psword){ // 그 아이디가 프론트에서 전달한 아이디와 비밀번호가 같은지 물어본다.
                return { success : true, msg : "로그인 성공"};
            }
            return { success : false, msg : "비밀번호가 틀렸습니다"} // 아이디만 같을때 리턴
        }
        return { success : false, msg : "존재하지 않는 아이디입니다"} // 아이디도 틀릴때 리턴
    }


}

module.exports = User;