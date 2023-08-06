import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import data from '../inquiryData'
import axios from 'axios';

function List(props) {

  const navigate = useNavigate();
  const [listData, setListData] = useState(data);
  const [listNum, setListNum] = useState(10);
  const totalPage = Math.ceil(props.dataLength/listNum);
  const pages = [];
  const [currPage, setCurrPage] = useState(1);
  const [sortOption, setSortOption] = useState(null);

  for(let i=0; i<totalPage; i++) { pages[i] = i+1; }

  const nextPage = () => { if (currPage !== pages[pages.length-1]) setCurrPage(currPage+1); }
  const prevPage = () => { if (currPage !== 1) setCurrPage(currPage-1); }

  useEffect(() => {
    console.log(props.queryData);
    const req = {page: currPage, listNum: listNum, sortOption:sortOption, queryData: props.queryData}
    axios.post('/api/'+props.getListApi, req, {"Content-Type": 'application/json'})
    .then((response) => {
      setListData(response.data);
    })
  },[currPage, listNum, sortOption, props.queryData, props.getListApi])

  useEffect(() => {
    setCurrPage(1);
  }, [props.queryData]);

  return(
    <>
    <div className="listBox">
      <ul>
        <li>
          <span className="no">No</span>
          <span className="title">제목</span>
        </li>
        { listData[0] ?
          listData.map((data) => {
            return(
            <li onClick={() => navigate(`/customerService/inquiry/${props.data.no}`)}>
              <span className="no">{props.data.no}</span>
              <span className="title">{props.data.title}</span>
            </li>
            )
          })
          :null  
        }
        </ul>
    </div>
    <div className="pages">
        <button onClick={() => {props.setCurrPage(1)}}>{'<<'}</button>
        <button onClick={prevPage}>{'<'}</button>
        {
          pages.map((page) => {
            return(
              <button key={page} className={page === currPage ? "currPageBtn" : "pageBtn"} onClick={() => {props.setCurrPage(page)}}>{page}</button>
            )
          })
        }
        <button onClick={nextPage}>{'>'}</button>
        <button onClick={() => {props.setCurrPage(pages[pages.length-1])}}>{'>>'}</button>
      </div>
    </>
  )

}
export default List;