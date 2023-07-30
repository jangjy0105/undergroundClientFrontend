import { useEffect, useState, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Main(props){

  const [tags, setTags] = useState(false);
  
  useEffect(() => {
      axios.get('/api/tag/getTag')
      .then((res) => {
        // console.log(res.data);
        setTags(res.data);
      })
  },[])
  
  return(
    <div className="home">
      <Hero></Hero>
      <ul className='movieLists'>
        {
          tags 
          ?
          tags.map((tag) => {
          return(
            <MovieLists key={tag.id} tag={tag} setDetailModal={props.setDetailModal}/>
          )
          })
          :
          <div>Loading</div>
        }
      </ul>
      {props.detailModal != -1 ? <DetailModal movieId={props.detailModal} setDetailModal={props.setDetailModal} />: null}
      {/* <div className='gradiant' /> */}
    </div>
  )
}

function Hero() {
  return(
    <div className="hero">
      <img className="heroImg" src={process.env.PUBLIC_URL + "/assets/heroImg.png"}></img>
      <button className="heroBtn">자세히 보기</button>
    </div>
  )
}

function MovieLists(props) {
  
  const [scrolled, setScrolled] = useState(0);
  const ref = useRef();
  const navigate = useNavigate([]);
  const [tagMovies, setTagMovies] = useState(false);

    // props.tag.movieIds.map((movieId) => {
    //   var pushMovie = props.movies.find((movie) => movie.id == movieId);
    //   if (pushMovie !== undefined) tagMovies.push(pushMovie);
    // })
  
    useEffect(() => {
      axios.post('/api/movie/getTagMovies', { tagId: props.tag.id }, {"Content-Type": 'application/json'})
      .then((res) => {
        setTagMovies(res.data);
      })
    }, [])
  
    useEffect(() => {
      ref.current.removeEventListener('scroll', onCheckScroll);
      ref.current.addEventListener('scroll', onCheckScroll);
    },[]);

    const onCheckScroll = () => {
      const x = ref.current.scrollLeft;
      const maxX = ref.current.scrollWidth- ref.current.clientWidth-25;
      
      // console.log(scrollWidth);
      // console.log(x+clientWidth);
      // console.log(scrollWidth);
      if (x > 0 && x < 110) {
        setScrolled(1)
      }
      else if (x >= 110 && x < maxX) {
        setScrolled(2);
      }
      else if (x >= maxX) {
        setScrolled(3);
      }
      else {
        setScrolled(0);
      }
    }

  return(
    <div>
      <ul className="movieList">
      {scrolled > 1 ? <ReducedTag tag={props.tag} /> : <div className='voidReducedTag'/>}
        <ul className="movieScroll" ref={ref}>
          {scrolled ? <button className='prevBtn' onClick={() => {
            ref.current.scrollBy({left:-500, behavior:'smooth'})
          }}>◀</button>: null}
        <div className='tag'>
          <div>
            {/* <img src={process.env.PUBLIC_URL + props.tag.tagIcon} className='tagIcon'/> */}
            <div className='tagName'>{props.tag.tagName.replace('학교','')}</div>
          </div>
        </div> 
        {
          tagMovies
          ?
          <TagMovies movies={tagMovies} setDetailModal={props.setDetailModal} />
          :
          <div>Loading...</div>
        }

          {
            scrolled === 3 ?
            null:
          <button className="nextBtn" onClick={() => {
            ref.current.scrollBy({left:500, behavior:'smooth'})
          }}>▶</button>
          
          }
        </ul>
        
      </ul>
    </div>
  )
}

function ReducedTag(props) {
  return(
    <div className='reducedTag'>
      <img src={process.env.PUBLIC_URL + props.tag.tagIcon} className='tagIcon'/>
      <span className='tagName'>{props.tag.tagName.replace('학교','')}</span>
    </div>
  )
}

function TagMovies(props) {
  const navigate = useNavigate();
  return(
    <>
    {
    props.movies.map((movie) => {
      return(
        <li className='movie' key={movie.id}>
          <div className='layer' onClick={() => {navigate('/player/'+movie.id)}} />
          <img className="moviePoster" src={process.env.PUBLIC_URL + '/assets/posterImg4.svg'} />
          <div className='movieInfo'>
            <div className='title'>{movie.title}</div>
            <div className='movieMenu'>
              <button>
                <img className='keepBtnIcon' src={process.env.PUBLIC_URL + "/assets/keepIcon.svg"} />
              </button>
              <button onClick={() => {props.setDetailModal(movie.id)}}>
                <img className='detailBtnIcon' src={process.env.PUBLIC_URL + "/assets/detailIcon.svg"} />
              </button>
            </div>
          </div>
        </li>
      )
    })
  }
  </>
  )
}

function DetailModal(props) {

  const [movie, setMovie] = useState(false); 

  useEffect(() => {
    axios.post('/api/movie/getDetail', {movieId: props.movieId}, {"Content-Type": 'application/json'})
    .then((res) => {
      setMovie(res.data[0])
      console.log(res.data[0]);
    })
  },[])

  const navigate = useNavigate();
  const score = 88;
  const scoreInt = parseInt(score/20);
  const scoreDec = ((score%20)/20)*14 + "px";

  const stars = [1,2,3,4,5];

  return (
    <div>
      <div className='modalOut' onClick={() => {props.setDetailModal(-1)}}></div>
      {
        movie 
        ? 
        <div className='detailModal'>
          <button className='closeBtn' onClick={() => {props.setDetailModal(-1)}}>
            <img className="closeBtnIcon" src={process.env.PUBLIC_URL + '/assets/exitIcon.svg'} />
          </button>
          <img className='detailImg' src={process.env.PUBLIC_URL + '/assets/posterImg4.svg'} />
            <button className='playBtn' onClick={() => {navigate('/player/'+movie.id)}}>재생</button>
            <button className='keepBtn'>찜</button>
          <div className='detailInfo'>
            <div className='topInfo'>
              <h1 className='title'>{movie.title}</h1>
              <div className='rightInfo'>
                <div className='score'>
                  <div className='fillScore'>
                    {
                      stars.map((star) => {
                        if (star <= scoreInt) return(<span className='starContainer'><span className='star'>★</span></span>)
                      })
                    }
                    <span className='starContainer' style={{width: scoreDec, overflow: "hidden"}}><span className='star'>★</span></span>
                  </div>
                  <div className='baseScore'>
                    {
                      stars.map((star) => {
                        return(<span className='starContainer'><span className='star'>★</span></span>)
                      })
                    }
                  </div>
                </div>
                <div className='runningTime'>총 : 101분</div>
                <div className='hits'>조회수 : 854회</div>
              </div>
            </div>
            <div className='bodyInfo'>
              <div className='summary'>{movie.summary}</div>
              <ul className='otherInfo'>
                <li>{movie.createdDate}</li>
                <li>{movie.directors}</li>
                <li>{movie.screenwriters}</li>
                <li>{movie.actors}</li>
              </ul>
            </div>
          </div>
        </div>
        :
        <div>Loading..</div>
      }
    </div>
  )
}


export default Main;