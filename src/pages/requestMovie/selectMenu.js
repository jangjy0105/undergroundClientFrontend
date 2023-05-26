import { useNavigate } from "react-router-dom";


function SelectMenu() {
  const navigate = useNavigate();
  return(
    <div className="selectMenu">
      <h1>영화 신청</h1>
      <div className="Btns">
        <div>
          <button onClick={() => {navigate("/requestMovie/request")}}>영화 요청</button>
          <p className="comment">일반 사용자분들이 보고싶은 영화가 있을 때 이용해주세요</p>
        </div>

        <div>
          <button onClick={() => {navigate("/requestMovie/upload")}}>영화 등록 신청</button>
          <p className="comment">영화 제작자 분들이 자신의 영화를 등록하고 싶을 때 이용해주세요</p>
        </div>
      </div>
    </div>
  )
}

export default SelectMenu;