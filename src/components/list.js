import { useState } from "react";

function List(props) {

  const [listData, setListData] = useState([]);

  const [listNum, setListNum] = useState(10);
  const totalPage = Math.ceil(props.dataLength/listNum);
  const pages = [];
  const [currPage, setCurrPage] = useState(1);

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
  },[currPage, listNum, sortOption, props.queryData])

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
        {
          listData[0] ?
          listData.map((data) => {
            return (
//              <li onClick={() => {navigate('/customerService/inquiry/'+inquiry.no)}}>
              <li>
                <span className="no">{data.no}</span>
                <span className="title">{data.title}</span>
              </li>
            )
          })
          :null
        }
      </ul>
    </div>
    <div className="pages">
        <button onClick={() => {setCurrPage(1)}}>{'<<'}</button>
        <button onClick={prevPage}>{'<'}</button>
        {
          pages.map((page) => {
            return(
              <button key={page} className={page === currPage ? "currPageBtn" : "pageBtn"} onClick={() => {setCurrPage(page)}}>{page}</button>
            )
          })
        }
        <button onClick={nextPage}>{'>'}</button>
        <button onClick={() => {setCurrPage(pages[pages.length-1])}}>{'>>'}</button>
      </div>
    </>
  )

}