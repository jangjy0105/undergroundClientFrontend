import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchModal(props) {
  const recentWords = ['최근검색어1','최근검색어2','최근검색어3','최근검색어4','최근검색어5','최근검색어6'];
  const recommenedWords = ['추천검색어1','추천검색어2','추천검색어3','추천검색어4','추천검색어5','추천검색어6'];
  
  const [wordsShowMode, setWordsShowMode] = useState(true);
  
  const [searchWord, setSearchWord] = useState(''); 

  const navigate = useNavigate();
  const search = (link) => {
    if (searchWord.split(' ').join('')){
      navigate(link);
      props.setSearchModal(false);
    }
    else alert("검색어를 입력해주세요");   
  }

  const enterKey = (e) => {
    if(e.key === 'Enter'){
      search('/search/'+searchWord)
    };
  }

  return (
    <div>
      <div className="modalOut" onClick={() => props.setSearchModal(false)}></div>
      <div className="searchModal">
        <div className="searchInput">
        <input className="searchText" onChange={(e) => {setSearchWord(e.target.value)}} onKeyUp={enterKey} autoFocus/>
        <button className="searchBtn" onClick={() => {search('/search/'+searchWord)}}>
          <img className='searchBtnIcon' src={process.env.PUBLIC_URL + '/assets/searchIcon.svg'} />
        </button>
        </div>
        <div className="words">
        <div className="wordsBtns">
          <button className={wordsShowMode ? "selectedBtn" : "RecentWordsBtn"} onClick={() => {setWordsShowMode(true)}}>최근검색어</button>
          <button className={wordsShowMode ? "recommenedWordsBtn" : "selectedBtn"} onClick={() => {setWordsShowMode(false)}}>추천검색어</button>
        </div>
        <div className="wordList">

          {
            wordsShowMode ?
            recentWords.map((recentWord) => {
            return (
                <div className="word">{recentWord}<button>x</button></div>
            )
            }):
            recommenedWords.map((recommenedWord) => {
              return (
                  <div className="word">{recommenedWord}</div>
              )
            })
          }
        </div>
        </div>
      </div>
    </div>
  )
}

export default SearchModal;