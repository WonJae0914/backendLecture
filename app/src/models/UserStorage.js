"use strict"

const fs = require("fs").promises // json파일에 접근해서 해당 파일을 읽을 수 있도록 filesystem을 불러와야 함. .promises하면 promise로 가져옴.

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
        return fs                                
        .readFile("./src/databases/users.json") 
        .then((data) => { // 버퍼데이터로 받아옴 -> JSON데이터로 변환해줘야 함         
            return this.#getUsers(data, isAll, fields);
        }) 
        .catch(console.error);                
    };

    //로그인
    static getUserInfo(id){
        return fs                                // readFile : 데이터(2진수)를 16진수로 보여줌
         .readFile("./src/databases/users.json") // promise를 반환하면 then에 접근가능. 에러는 catch
         .then((data) => {                // then : 로직이 성공했을 때 실행되는 것
            console.log(JSON.parse(data));
             return (this.#getUserInfo(data, id));
         }) 
         .catch(console.error);                  // catch : 로직이 에러가 났을 때 실행되는 것
     }

    // 회원가입 정보를 db에 저장하는 로직 
    static async save(userInfo){
        // db에 추가 할 데이터 불러오는 과정
        const users = await this.getUsers(true);                          // 변수 users에 db에 추가 할 데이터 담김
        if(users.id.includes(userInfo.id)){                               // client가 입력한 id가 db에 있는지 비교
           throw "이미 존재하는 아이디입니다.";                             // throw 처리해야 User.js에서 try catch구문에서 catch에러쪽으로 에러가 던져진다.
        };
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        // db에 데이터 추가
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));  // writeFile("저장경로", "저장할데이터")
        return { success : true };
    };
};
module.exports = UserStorage;