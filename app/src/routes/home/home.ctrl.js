"use strict"

const User = require("../../models/User");

// 단순히 해당 페이지를 렌더링 해주는 페이지
const output = {
    home : (req, res)=>{         
        res.render("home/index");           
    },
    login : (req, res)=>{         
        res.render("home/login");
    },
    register : (req, res) =>{
        res.render("home/register")
    },
};


// 프론트에서 요청 받은 값 서버로 보낼 함수
const process = {
    login : async(req, res) =>{
        const user = new User(req.body); // 프론트에서 입력한 값을 파라미터로 넘김
        const response = await user.login();   // user.~~를 불러오면 req한 body값을 항상 가지고 다님.
        return res.json(response);
        // return res.json(response);

        // const id = req.body.id,
        //   psword = req.body.psword;

        // const users = UserStorage.getUsers("id","psword"); // 아이디, 패스워드, 이름 중 아이디 패스워드만 불러오고 싶음 

    
        // const response = {};
        // //유저 아이디, 패스워드 검증하는 로직
        // if (users.id.includes(id)) { // 프런트에서 전달한 id가 users.id에 (나중엔 서버) 있으면
        //     const idx = users.id.indexOf(id); // users.id의 인덱스를 가져오고
        //     if(users.psword[idx] === psword) { // 프런트에서 전달한 psword가 idx가 같으면
        //         response.success = true;
        //         return res.json(response);
        //         // return res.json({            // 로그인 성공했는지 여부를 res 해줌. json 객체로 전달해야 하니 object 형태로 전달
        //         //     success : true,          // 로그인 성공하면 sucess : true 라는 오브젝트를 제이슨으로 만들어서 프런트로 res한다.
        //         };
        //     };
    
        // // // 실패했을 때 (if문에서 성공했을때 return으로 빠져나오기 때문에 실패할 때 코드는 return값으로 처리)
        // response.success = false;
        // response.msg="로그인에 실패하셨습니다";
        // return res.json(response);
        // // return res.json({
        // //     success : false,
        // //     msg : "로그인에 실패하셨습니다",
        // // });
    },
     register: async (req,res) => {
        const user = new User(req.body); // 프론트에서 입력한 값을 파라미터로 넘김
        const response = await user.register();   // user.~~를 불러오면 req한 body값을 항상 가지고 다님.
        return res.json(response);
    }
};

module.exports = { // 오브젝트 타입으로도 내보낼 수 있음 
   output,
   process,     // key : value(=key) 가 된다. 
}
