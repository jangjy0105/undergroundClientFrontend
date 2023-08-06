import { useState } from "react";
import { useNavigate } from "react-router-dom";
import inquiryData from "../../inquiryData";
import List from "../../components/list";

function InquiryList(props) {
  const navigate = useNavigate();
  const [currPage, setCurrPage] = useState(1);
  const inquries = inquiryData.sort((a, b) => b.no - a.no);
  const pages = props.pages;
  
  return (
    <div className="inquiryList">
      <button className="postBtn" onClick={() => navigate('/customerService/inquiry/post')}>
        글쓰기
      </button>
      <List data={inquries} pages={pages} currPage={currPage} setCurrPage={setCurrPage} />
    </div>
  );
}

export default InquiryList;