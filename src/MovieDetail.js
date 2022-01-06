import React,{useEffect, useState} from "react";
import { useParams } from "react-router";
import axios from 'axios'
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import './Row'
import Spinner from "react-spinkit";
import Youtube from "react-youtube";
import { MoreDetail } from "./detail-components/MoreDetail";
import Stats from "./detail-components/Stats";
import './Detail.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncMoviesDetail ,getSelectedMovieOrShow, setDetails } from "./features/movie/movieSlice";
import {selectCasts ,setCast } from "./features/movie/castSlice";
import Cast from "./detail-components/Cast";
const MovieDetail = () => {
  const {id} = useParams();
  const[loading,setLoading] = useState(true);
  const dispatch = useDispatch()
  const detail = useSelector(getSelectedMovieOrShow);
  // console.log("Movi",detail)
  // const [detail,setDetail] = useState([]);
  const [trailer,setTrailer] = useState([]);
  
  // let data = useLocation();
  const baseUrl = "https://image.tmdb.org/t/p/original"

  const opts = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 0
    }
  };

  /////////////////FOR FETCHING CREDITS AND CAST RELATED DETAILS////////////////////
 
  const fetchData = async() =>{
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=74de71d03e661d70414e23b100e51515&language=en-US`).catch((e)=>{
      console.log('error in fetching')
    })
    // console.log("CAST:",response.data)
    dispatch(setCast(response.data.cast))
}

const fetchTrailer = async() =>{
  const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=74de71d03e661d70414e23b100e51515&language=en-US`).catch((e)=>{
    console.log('error in fetching')
  })
  setTrailer(response.data.results[0]?.key)
}
  

  let yeardata = (detail.vote_average)*10
  // console.log(yeardata)
  useEffect(()=>{  
    fetchData();
    fetchTrailer();
    dispatch(fetchAsyncMoviesDetail(id));
    // dispatch(fetchAsyncCasts(id));
    setTimeout(() => setLoading(false), 2000)
  },[dispatch,id]);


  // console.log("HELLO ")
//  console.log(crewdata.length)
    // // For Director
    // for(var i=0;i<crewdata.length;i++)
    // {
    //   if(crewdata[i].job=='Director')
    //   {
    //     var director =crewdata[i].name;
    //   }  
    // }

   
    // // For Screenplay
    // for(var i=0;i<crewdata.length;i++)
    // {
    //   if(crewdata[i].job=='Screenplay')
    //   {
    //     var screenplay =crewdata[i].name;
    //   }  
    // }

    // //For Story
    // for(var i=0;i<crewdata.length;i++)
    // {
    //   if(crewdata[i].job=='Story')
    //   {
    //     var story =crewdata[i].name;
    //   }  
    // }
 
 const genre = detail.genres 
 
  var year = new Date(detail.release_date).getFullYear()

  if(loading){
    return (
      <AppLoading>
      <AppLoadingContents>
      <Spinner name="line-spin-fade-loader" />
      </AppLoadingContents>
      </AppLoading>
    )
  }

    return (
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
        <p> {detail.original_title} </p>
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
        <p>{ detail.production_companies && 
          detail.production_companies[0].origin_country}</p>
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
        <p>{detail.runtime} min</p>
      </div>
      </Rating>
      <Score>
      <div className='score'>
      <div className='heading'>
      <h4>User Rating</h4><p>({detail.vote_count})</p>
      </div>
      <p>{(detail.vote_average)*10}%</p>
      </div>
      
      </Score>
       <Tagline>
       <p>{detail.tagline}</p>
       </Tagline>

      <Overview>
        <p className='Title'>Overview</p>
        <p className='content'>{detail.overview}</p>
      </Overview>
      <Credit>
        {/* <Director>
        <p  className='crew-title'>Director</p>
        <p className='data'>{director}</p>
        </Director>

        <Screenplay>
        <p  className='crew-title'>Screenplay</p>
        <p className='data'>{screenplay}</p>
        </Screenplay>

        <Story>
        <p className='crew-title'>Story</p>
        <p className='data'>{story}</p>
        </Story> */}
      </Credit>
      </Description>
      </Detail>
      </Container>
      <Container2>
      <div className = 'cast'>
      <Cast/> 
      </div>
      <Stats/>
      </Container2> 
      {/* <Temp>
        <Link to={`/${detail.original_title}/${detail.id}/credits`}>Mo</Link>
      </Temp> */}
      <Container3>
      <div className='trailer'>
      <Youtube videoId={trailer} opts={opts} />
      </div>
      </Container3> 
    </>
    )

    // return (
    //   <>
    //   HE
    //   </>
    // )
}


export default MovieDetail

const Temp = styled.div`
  background:white;
`;

const Container3 = styled.div`
{/* margin-top:10px; */}
display:flex;
background:white;
padding: 0 calc(3.5vw + 10px);
.trailer{
  padding:20px;
  margin-top:50px;
  width:600px;
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

const Score = styled.div`
display:flex;
margin-top:20px;
margin-left:40px;
margin-right:50px;
`;
const Crew = styled.div`

`;

const Story = styled.div`
margin-right:30px;
flex: 1; 
  margin: 0 1%;
  margin-right:90px;

`;

const Director = styled.div`
margin-right:30px;
flex: 1; 
  margin: 0 1%;

`;

const Screenplay = styled.div`
margin-right:30px;
flex: 1; 
  margin: 0 1%;

`;

const Credit= styled.div`
margin-top:60px;
margin-bottom:10px;
margin-right:50px;
display:flex;
{/* justify-content:space-between; */}

margin-left:40px;
.data{
  padding:5px;
  font-size:20px;
  font-weight:600;
}
crew-title{
  padding:15px;
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