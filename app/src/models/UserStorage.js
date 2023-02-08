"use strict"

const db= require("../config/db") // db모듈 불러오기

class UserStorage {  
    //로그인 : db에 접근하기 -> 유저정보 반환(promise로 반환해야됨!)
    static getUserInfo(id){
        return new Promise((resolve, reject) => {
            const query = "select * from users WHERE id = ? ";
            db.query(query, [id], (err, data) => {
                if(err) return reject(`${err}`);
                // console.log(data[0]);
                resolve(data[0]);
            });
        }); 
     };
    // 회원가입 정보를 db에 저장하는 로직 
    static async save(userInfo){
        return new Promise((resolve, reject) => {
            const query = "insert into users(id, name, psword) values(?, ?, ?)";
            db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => {
                if(err) return reject(`${err}`);
                resolve( { success : true } );
            });
        }); 
    };
};
module.exports = UserStorage;