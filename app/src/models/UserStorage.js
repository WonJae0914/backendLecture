"use strict"

class UserStorage {
    // static 선언 시 new 연산자를 선언하지 않아도 클래스 내의 값들을 불러올 수 있다. 
    // 클래스 내에서 변수 선언시 선언자 필요없음
    static #users = {                             // #을 붙여 데이터 은닉화하고 메서드 생성하여 리턴값으로 해당 데이터를 전달한다.     
       id : ["nolja909", "hadnjswp", "조원재"],
       psword : ["1234", "1234", "123456"],
       name : ["조원재", "조투재", "조삼재"],
    };

    // 
    // static getUsers(...fields){ // (...변수명) 입력 시 컨트롤단에서 던진 파라미터값을 받아옴.
    //     const users = this.#users; 
    //     // 원하는 데이터만 newUsers 에 담기
    //     const newUsers = fields.reduce((newUsers, field) =>{ // reduce : 배열 메소드. 반복문. 파라미터로 새로 오브젝트가 생성될 것. field에 대한 원소가 하나씩 순회된다.
    //         if(users.hasOwnProperty(field)){ // 유저스에 해당하는 키값이 있다면
    //             newUsers[field] = users[field];
    //         }
    //         return newUsers;
    //         // console.log(newUsers, field); // 첫번째 파라미터로 id값, 두번째 파라미터로 pswod 값이 들어갔다. newUsers에는 fileds라는 배열의 초기값이 들어가고 그 다음 변수들에 순차적으로 값이 들어간다). 초기값 newUsers를 마음대로 지정할 수 있다. 
    //     }, {});   
    //     // console.log(newUsers);                        
    //     return newUsers;
    // };

    static getUserInfo(id){
        const users = this.#users; // 디비에서 받아온 데이터 정보
        const idx = users.id.indexOf(id);   // User.js의 UserStorage.getUserInfo의 파라미터로 넘겨준 id값의 인덱스
        const usersKeys = Object.keys(users);                    // 디비에서 받아온 정보의 키값들만 리스트로 만듬 => [id, psword, name]
        const userInfo = usersKeys.reduce((newUser, info) => {   // 초기값 : 오브젝트 
            newUser[info] = users[info][idx]                     // 처음 key값 : id.  그렇기에 users[info]의 처음 값도 id. [idx]는 해당 인덱스 값을 다 들고옴. 
            return newUser;
        }, {});
        return userInfo;
    }

    static save(userInfo){
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        console.log(users);
        return { success : true};
    }
};
module.exports = UserStorage;