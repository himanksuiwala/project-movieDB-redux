import React,{useEffect, useState} from "react";
import { useParams } from "react-router";
import axios from 'axios'
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import './Row'
import Spinner from "react-spinkit";
import Youtube from "react-youtube";
import Stats from "./detail-components/Stats";
import TvStats from "./detail-components/TvStats";
import './Detail.css'
import Cast from "./detail-components/Cast";
import { useDispatch,useSelector } from "react-redux";
// import { setDetails } from "./features/movie/movieSlice";
import { setCast } from "./features/movie/castSlice";
import AllSeason from "./detail-components/AllSeason";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  withRouter

} from "react-router-dom";
import { fetchAsyncShowDetail,fetchShowSeasonDetail, getSelectedMovieOrShow } from "./features/movie/movieSlice";
export default function TvDetail() {
  // const [detail,setDetail] = useState([]);
  // const [trailer,setTrailer] = useState([]);
  const [loading,setLoading] = useState(true);
  const {id} = useParams();
  let data = useLocation();
  const dispatch = useDispatch()
  const baseUrl = "https://image.tmdb.org/t/p/original"

  const detail= useSelector(getSelectedMovieOrShow);
  // console.log(detail)
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0
    }
  };

//   const fetchData1 = async()=>{
//     const response = await axios.get(`https://api.themoviedb.org/3/tv/${data.state.id}?api_key=74de71d03e661d70414e23b100e51515&language=en-US`).catch((e)=>{
//       console.log('error in fetching')
//     })
//     setDetail(response.data)
//     // dispatch(setDetails(response.data))
//    }

   const fetchData = async() =>{
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=74de71d03e661d70414e23b100e51515&language=en-US`).catch((e)=>{
      
    console.log('error in fetching')
    })
    // console.log("cast:data",response.data)
    dispatch(setCast(response.data.cast))
}

// const fetchTrailer = async() =>{
//   const response = await axios.get(`https://api.themoviedb.org/3/tv/${data.state.id}/videos?api_key=74de71d03e661d70414e23b100e51515&language=en-US`).catch((e)=>{
//     console.log('error in fetching')
//   })
//   setTrailer(response.data.results[0]?.key)
//   // console.log(response.data.results[0]?.key)
// }
// const size = detail.seasons;
// console.log("props",props)
// console.log("size",size.length)

  useEffect(()=>{
    // fetchData1();
    fetchData();
    // fetchTrailer();
    dispatch(fetchAsyncShowDetail(id));
    dispatch(fetchShowSeasonDetail(id));
    setTimeout(()=>setLoading(false),2000)
  },[dispatch,id]);


  const genre = detail.genres
 
  var year = new Date(detail.first_air_date).getFullYear()
  var lastyear = new Date(detail.last_air_date).getFullYear()
//   {
//     detail.networks &&   detail.networks.map((i)=>{
//       // console.log(i.name)
//     })
//   }

  console.log(detail)
  if(loading){
    return (
      <AppLoading>
      <AppLoadingContents>
      <Spinner name="line-spin-fade-loader" />
      </AppLoadingContents>
      </AppLoading>
    )
   
  }

  return(
    <>
    <Container>
      <div className='background'>
      <img src={`${baseUrl}${detail.backdrop_path}`}/>
      </div>
      <Detail>
      <ImageTitle>
        <img src={`${baseUrl}${detail.poster_path}`} />
      </ImageTitle>
      <Description>
      <Title>
        <div className='title'>
        <p> {detail.original_title || detail.name} </p>
        </div>
        <div className='year'>
        {
         <p>({year})</p>
        }
        </div>
      </Title>
      <Rating>
      <div className='release'>
          <p>{detail.release_date}</p>
      </div>
      <div className='origin'>
        {/* <p>{ detail.production_companies && 
          detail.production_countries[0].name}</p> */}
      </div>
      <div className='genre'>
      <p>•</p>
      { detail.genres && 
        genre.map((g)=>{
          return(
            <div className='genre-type'>
              <p>{g.name}</p>
            </div>
          )
        })
      }
      </div>
      <div className='runtime'>
              <p>{detail.episode_run_time && detail.episode_run_time[1]} min</p>
             </div>
      </Rating>
      <Tagline>
       <p>{detail.tagline}</p>
       </Tagline>
       <Overview>
        <p className='Title'>Overview</p>
        <p className='content'>{detail.overview}</p>
      </Overview>
      </Description>
      </Detail>
    </Container>
    <Container2>
    <div className='cast'>
    <Cast/>
    </div>
    <TvStats/>
    </Container2>
      <CastContainer>
        <div className='Header'>
          <h3>More Seasons</h3>
        </div>
        {/* <div className='season-container'> */}
        {/* <div class="season-detail"> */}
      
        
        {
               detail.seasons && 
              <><div className='season-container'>
            <div className='season-poster'>
              <img src={`https://image.tmdb.org/t/p/original/${detail.seasons[detail.seasons.length - 1].poster_path}`} />
            </div>
            <div class="season-detail">
              <div class="season-name">
                <h3>{detail.seasons[detail.seasons.length - 1].name}</h3>
              </div>
              <div className="episode-count">
                <p>{lastyear}</p>
                <p>{detail.seasons[detail.seasons.length - 1].episode_count} Episodes</p>
              </div>
              <div className="seasons-data">
                <p>{detail.seasons[detail.seasons.length - 1].overview}</p>
              </div>
            </div>
          </div>
          <div className="all-season">
          {/* <Route path={`/tv/seasons`} component={AllSeason} >
            <p>dss</p>
          </Route> */}
          <Link to={{
                pathname:`/tv/${detail.id}/seasons`,
                state:detail.seasons
               
            }}
            > <h3>View All Seasons</h3></Link>
          
            </div></>
              
        } 
        {/* </div> */}
        {/* </div> */}
      </CastContainer>
    
    {/* <Container3>
      <div className='trailer'>
      <Youtube videoId={trailer} opts={opts} />
      </div>
      </Container3> */}
    </>
  )
// return(
//     <h1>HELLO</h1>
// )
}

const CastContainer = styled.div`
padding: 0 calc(3.5vw + 10px);
background:pink;
.season-container{
  display:flex;
}
.season-poster{
  height: 200px;
    width: 180px;
    padding:5px;
}
img {
    max-width: 100%;
    max-height: 100%;
}

.season-name{
padding:5px;
padding-left:10px;font-size:22px;
display:flex;
}
.seasons-data{
  padding:10px;
  display:flex;
}

.episode-count{
  display:flex;
  padding:5px;
padding-left:5px;
  p{
    margin:5px;
  }
}

.all-season{
padding:10px;
height:20px;
}
`;


const Container2 =styled.div`
display:flex;
justify-content: space-between;
{/* margin-left: 60px; */}
padding: 0 calc(3.5vw + 10px);
padding-top:50px;
background:white;
`;

const Container3 = styled.div`
display:flex;
background:white;
padding: 0 calc(3.5vw + 10px);
.trailer{
  padding:20px;
  margin-top:50px;
  width:600px;
}
`;

const Overview = styled.div`
margin-top:20px;
margin-left:40px;
margin-right:50px;
padding-right:100px;
p{
  margin-left:9px;
  text-align: justify;
}

.Title{
  font-weight:650;
  margin-bottom:20px;
}
`;


const Tagline = styled.div`
margin-left:40px;
margin-top:20px;
text-align: left;
margin-right:50px;
padding:02px;

p{
  margin-left:9px;
}
`

const Rating = styled.div`
margin-left:40px;
display:flex;margin-right:50px;
margin-top:20px;
`; 

const Title = styled.div`
display:flex;
margin-right:50px;
flex-direction:row;
margin-left:40px;
margin-top:42px;
`;

const Detail = styled.div`
display:flex;
margin-top:60px;
`;

const Description = styled.div`
width:100%;
`;

const ImageTitle = styled.div`
  max-width: 350px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    
  }
`;

const DetailContainer = styled.div`

const ImageComponent = styled.div`

const Container = styled.div`
 padding: 0 calc(3.5vw + 10px);
 color:white;
  margin-bottom:50px;


`
const Details = styled.div`
h1{
  color:black;
}
`
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`;