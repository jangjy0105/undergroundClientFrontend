import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginModal(props) {
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [warnning, setWarnning] = useState(false);
  const [findMode, setFindMode] = useState(false);
  const [confirmEmail, setconfirmEmail] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false)
  const navigate = useNavigate();

  return (
    <div>
    <div className="modalOut" />
    <div className="loginModal">

      {
        findMode 
        ? 
        <button className="backBtn" onClick={() => {setFindMode(false)}}>
          <img className="backBtnIcon" src={process.env.PUBLIC_URL + '/assets/backBtnIcon.svg'} />
        </button>
        :
        null
      }

      <button className="closeBtn" onClick={() => {props.setLoginModal(false)}}>
        <img className="closeBtnIcon" src={process.env.PUBLIC_URL + '/assets/exitIcon.svg'} />
      </button>
      
      {
        confirmEmail ? (
          <div className="confirmEmail">
            안녕하세요
          </div>
        ) : (
          phoneModalOpen ? (
            // 전화번호 모달 내용
            <div className="phoneModalContent">전화번호인증</div>
          ) : (
          
          findMode
          ?
          <div className="find">
            <div className="confirmBtns">
            <div className="confirmBtnBox">
              <button onClick={() => {setPhoneModalOpen(true)}}>
                <img src={process.env.PUBLIC_URL + '/assets/telephone.svg'} />
              </button>
              <div className="confirmWay">전화번호 인증</div>
            </div>

              <div className="confirmBtnBox">
                <button onClick={() => {setconfirmEmail(true)}}> {/* 이메일 모달 열기 */}
                  <img src={process.env.PUBLIC_URL + '/assets/messege.svg'} />
                </button>
                <div className="confirmWay">이메일 인증</div>
              </div>
              {/* ... (전화번호 인증 버튼 등) ... */}
            </div>
          </div>
          : 
          <div className="login">
          <h2 className="loginTitle">로그인</h2>
          {warnning ? <div className="warnning">아이디 또는 비밀번호를 잘못 입력하였습니다.</div> : <div className="hidedWarnning"></div>}
          <input placeholder="아이디" className="loginInput" value={loginId} onChange={(e) => {setLoginId(e.target.value)}}></input>
          <input type="password" placeholder="비밀번호" className="loginInput" value={loginPw} onChange={(e) => {setLoginPw(e.target.value)}}></input>
          <div className="saveId">
            <input type="checkbox" className="checkbox"></input>
            <span> 아이디 저장</span>
          </div>
          <button className="loginBtn" onClick={() => {setWarnning(true)}}>로그인</button>
          <button className="findBtn" onClick={() => {setFindMode(true)}}>아이디 / 비밀번호 찾기</button>
          <div className="RUMember">
            <span>아직 회원이 아니신가요?</span>
            <button onClick={() => {navigate('/signin')}}>회원가입</button>
          </div>
            {/* <span>|</span>
            <button onClick={() => {navigate('/findIdPw')}}>비밀번호 찾기</button>
            <span>|</span>
            <button onClick={() => {navigate('/signin')}}>회원가입</button> */}
        </div>
          )
        )
      }
      
      
      </div>
    </div>
  )
}

export default LoginModal;