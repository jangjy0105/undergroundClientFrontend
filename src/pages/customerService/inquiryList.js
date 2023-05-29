import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InquiryList(props) {

  const navigate = useNavigate();
  const inquiries = props.inquiries;
  const pages = props.pages;

  const nextPage = () => {
    if (props.currPage !== pages[pages.length-1]) props.setCurrPage(props.currPage+1);
  }
  const prevPage = () => {
    if (props.currPage !== 1) props.setCurrPage(props.currPage-1);
  }

  return (
    <div className="inquiryList">
      <button className="postBtn" onClick={() => {navigate('/customerService/inquiry/post')}}>글쓰기</button>
      <div className="listBox">
        <ul>
          <li>
            <span className="no">No</span>
            <span className="title">제목</span>
          </li>
          {
            inquiries[props.currPage-1].map((inquiry) => {
              return (
                <li onClick={() => {navigate('/customerService/inquiry/'+inquiry.no)}}>
                  <span className="no">{inquiry.no}</span>
                  <span className="title">{inquiry.title}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="pages">
        <button onClick={() => {props.setCurrPage(1)}}>{'<<'}</button>
        <button onClick={prevPage}>{'<'}</button>
        {
          pages.map((page) => {
            return(
              <button className={page === props.currPage ? "currPageBtn" : "pageBtn"} onClick={() => {props.setCurrPage(page)}}>{page}</button>
            )
          })
        }
        <button onClick={nextPage}>{'>'}</button>
        <button onClick={() => {props.setCurrPage(pages[pages.length-1])}}>{'>>'}</button>
      </div>
    </div>  
  )
}

export default InquiryList;