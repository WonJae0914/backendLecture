"use strict"

const db = require("../config/db");
const bcrypt = require("bcrypt");  

class UserStorage {  
    //로그인 : db에 접근하기 -> 유저정보 반환(promise로 반환해야됨!)
    static getUserInfo(id){
        return new Promise((resolve, reject) => {
            const query = "select * from users WHERE id = ? ";
            db.query(query, [id], (err, data) => {
                if(err) return reject(`${err}`);
                else resolve(data[0]);
            });
        }); 
     };
    // 회원가입 정보를 db에 저장하는 로직 
    static save(userInfo){
        const query = "insert into users(id, name, psword) values(?, ?, ?)";
        const salt = 10;
        
        return new Promise((resolve, reject) => {
                    // 암호화하여 DB에 저장
                    bcrypt.hash(userInfo.psword, salt, function(err, hash) {
                    if(err) return next(err);
                    userInfo.psword = hash;
                    db.query(query, [userInfo.id, userInfo.name, hash], (err) => {
                        if(err) return reject(`${err}`);
                        else resolve ({success : true , msg : "회원가입을 축하합니다"} );
                    });
                }); 
            });
        }       
    }
module.exports = UserStorage;