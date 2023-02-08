"use strict"

const db= require("../config/db") // db모듈 불러오기

class UserStorage { // static 선언 시 new 연산자를 선언하지 않아도 클래스 내의 값들을 불러올 수 있다. 
                    // 클래스 내에서 변수 선언시 선언자 필요없음

    //로그인 시 입력한 정보와 DB정보 비교하여 정보 반환하는 로직
    static #getUserInfo(data, id){
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);                        // User.js의 UserStorage.getUserInfo의 파라미터로 넘겨준 id값의 인덱스
        const usersKeys = Object.keys(users);                    // 디비에서 받아온 정보의 키값들만 리스트로 만듬 => [id, psword, name]
        const userInfo = usersKeys.reduce((newUser, info) => {   // 초기값 : 오브젝트 
            newUser[info] = users[info][idx];                    // 처음 key값 : id.  그렇기에 users[info]의 처음 값도 id. [idx]는 해당 인덱스 값을 다 들고옴. 
            return newUser;
        }, {});
        return userInfo;
    }
    
    static #getUsers(data, isAll, fields){
        const users = JSON.parse(data);
        if(isAll) return users; // isAll : db에 대응하는 필드값을 전부 가져올 때 
        const newUsers = fields.reduce((newUsers, field) =>{    // reduce : 배열 메소드. 반복문. 파라미터로 새로 오브젝트가 생성될 것. field에 대한 원소가 하나씩 순회된다.
            if(users.hasOwnProperty(field)){                    // hasOwnProperty : 해당 객체에 특정한 property가 있다면 true, 아니면 false를 반환
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});                       
        return newUsers;
    }

     // 회원가입
    static getUsers(isAll, ...fields){
                
    };

    //로그인 : db에 접근하기 -> 유저정보 반환
    static getUserInfo(id){
        db.query("select * from users", (err, data) => {
            console.log(data);
        });
     }

    // 회원가입 정보를 db에 저장하는 로직 
    static async save(userInfo){
    
    };
};
module.exports = UserStorage;