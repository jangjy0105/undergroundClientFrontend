import { useState } from "react";
import Input from "../../components/input";

function Signin(){

  const [pwWarnig, setPwWarnig] = useState('');
  const [pw, setPw] = useState('');

  const inputs = {
    id: {name: '아이디', type: 'default', dataName: 'id'},
    password: {name: '비밀번호', type: 'password', dataName: 'password'},
    name: {name: '이름', type: 'default', dataName: 'name'},
    phoneNumber: {name: '전화번호', type: 'default', dataName: 'phoneNumber'},
  }

  const [inputDatas, setInputDatas] = useState({
    id: '',
    password: '',
    name: '',
    phoneNumber: ''
  })

  const changePw = (e) => {
    const copyPwWarning = pwWarnig
    setPw(e.target.value);
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/g.test(pw) ? setPwWarnig('') : setPwWarnig('조건에 일치하지 않습니다.');
  }

  const value = '';

  return(
    <div className="upload">
      <h1>회원가입</h1>
      <div className="inputs">
      {
        Object.keys(inputs).map((keyName) => {
          return(
            <Input inputName={inputs[keyName].name} inputType={inputs[keyName].type} inputValue={inputDatas[inputs[keyName].dataName]} />
          )
        })
      }
      </div>
      {/* <div className="inputs">
        <div className="inputBox">
          <span className="inputName">이메일</span>
          <input />
          <span className="rhfqoddl">@</span>
          <select />
          <button className="confirmNumBtn">인증번호 받기</button>
        </div>
        <div className="inputBox">
          <span className="inputName">인증번호</span>
          <input />
          <button className="confirmBtn">인증</button>
        </div>
        <div className="inputBox">
          <span className="inputName">비밀번호</span>
          <input type="password" value={pw} onChange={(e) => changePw(e)} />
        </div>
        <div>{pwWarnig}</div>
        <div className="inputBox">
          <span className="inputName">비밀번호 확인</span>
          <input type="password" />
        </div>
        <div className="inputBox">
          <span className="inputName">전화번호</span>
          <input type="tel" />
        </div>
        <div className="inputBox">
          <span className="inputName">수신 동의</span>
          <div className="checkboxContainer">
          <input type="checkbox" /> 
          <span className="checkboxName">SMS 수신 동의</span>
          <input type="checkbox" /> 
          <span className="checkboxName">이메일 수신 동의</span>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Signin;