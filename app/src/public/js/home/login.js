"use strict"

const id = document.querySelector("#id"), 
  psword = document.querySelector("#psword"),
loginBtn = document.querySelector("#button");

loginBtn.addEventListener("click", login);

function login (){ // login 클릭 시 서버로 전달할 함수 
    const req = {  // 서버로 요청할 값을 req 라는 변수에 담기 위해 선언
        id : id.value, // 서버로 전달할 id값
        psword : psword.value, // 서버로 전달할 psword값
    };

    // 프런트에서 데이터를 전달하는 과정 시작
    // fetch(데이터를 전달할 경로, {전달할 데이터}). 전달할 데이터는 오브젝트 형태로 보내줘야 한다(제이슨 방식의 데이터)
    fetch("/login", {
        method : "POST",                        // POST 방식으로 데이터를 보낼 것을 선언
        headers : {                             // 어떤 데이터 타입으로 보낼 것인지 선언. 오브젝트로 전달.
            "Content-Type" : "application/json" // 제이슨 타입으로 보내줄 것.
        },      
        body : JSON.stringify(req),             // 키값 body로 전달할 데이터를 보내야 하는데 JSON 타입으로 보내줘야 한다.
                                                // stringify는 req 데이터를 문자열로 바꿔주는 메소드다
        
    // 프런트에서 데이터를 전달하는 과정 끝

    // 서버에서 전달한 데이터를 프런트에서 다시 받는 과정 시작
    })
        .then((res) => res.json())   // then 메소드로 res 값을 받음. json 타입으로 반환
        .then((res) => {
            if(res.success){      
                alert(res.msg)   // success가 true 일때   
                location.href = "/"; // '/' 주소값으로 이동
            }else{
                alert(res.msg);      // 로그인 실패지 메세지 
            }
        })
        .catch((err)=>{              // 에러처리
            console.error(new Error("로그인중 에러발생"));
        })
};

// fetch를 통해 서버랑 프런트랑 해당 데이터를 어떤 경로에서 주고 받을지를 정해줘야 한다
// 보통 이런 경로는 서버 개발자가 설계한다
// 프런트 개발자가 해당 경로를 요청하기전에 
// 해당 경로에 API가 이미 만들어져야 한다 
// 라우트에 인덱스 닷 제이에스에 보면 get 방식의 api가 만들어져있지만
// 아이디랑 비밀번호를 받을 api는 만들어져 있지 않다
// 그러나 만들어져있다 가정하고 fetch를 써보자






