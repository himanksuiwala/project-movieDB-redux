import React from 'react'
import styled, { StyledComponent } from 'styled-components'
// import { setDetails } from "../features/movie/movieSlice";
import { useSelector } from 'react-redux'
import { getAllMovies, selectDetails } from '../features/movie/movieSlice'
import { useLocation } from 'react-router'
import { useEffect } from 'react'
import { useState } from 'react'
import {getSelectedMovieOrShow,getAllSeasons } from "../features/movie/movieSlice";

const AllSeason = (props) => {
    const[seasonList,setSeasonList]= useState([]);
    let logged = useLocation();
    const data = useSelector(getAllSeasons);
    const baseUrl = "https://image.tmdb.org/t/p/original"
    useEffect(() => {
        setSeasonList(logged.state)
       
    }, [])
    // console.log("Season",data)
    // var year = new Date(i.air_date).getFullYear()
    return (
        <Container>
        <TopContainer>
            <Poster>
            {
                seasonList && seasonList[0] && <img  src={`${baseUrl}/${seasonList[0].poster_path}`}/>
            }
                
            </Poster> 
        <Detail>
            <div className='header'>
            <h1>Money Heist </h1>
            </div> 
            <div className='release'>
            <h1>2017</h1>
            </div>
        </Detail>
        </TopContainer>

    {seasonList && seasonList.map((i)=>{
        var year = new Date(i.air_date).getFullYear();
        console.log("l",seasonList[0])
         return(<>
             <SeasonContainer>
            <AllseasonList>
                <div className='poster'>
                    <img  src={`https://image.tmdb.org/t/p/original/${i.poster_path}`}/>
                </div>
                <div className='side-container'>
                    <div className='header'>
                        <h2>{i.name}</h2>
                    </div>
                    <div className='release'>
                        {/* <p>Premeired in {year}</p> */}
                        <div className='year-season'>
                        <p>{year} | {i.episode_count} Episodes</p>
                        </div>
                    </div>
                    <div className='detail'>
                        <p>{i.overview}</p>
                    </div>
                    
                </div> 
                
            </AllseasonList>
            <hr></hr>
            </SeasonContainer>
            </>
            )
        })}
        </Container>
    )
}

export default AllSeason;


const SeasonContainer = styled.div`

`;

const AllseasonList = styled.div`
margin-top:15px;
margin-bottom:15px;
display:flex;

.detail{
    margin-top:12px;
    text-align: justify;
    padding:3px;
}
.side-container{
    margin-left:25px;
}
h2{
    padding:4px;
}

.header{
    display:flex;
}
.release{
    display:flex;
    margin-left:px;
}
.year-season{
    
    margin-top:5px;
    ${'' /* margin-left:8px; */}
    font-weight:500;
}
.poster{
    max-width: 120px;
    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius:10px;
    }
}
`;



const Detail = styled.div`
display:flex;

.header{
   margin-top:12px;
   margin-left:17px;
   ${'' /* display:flex; */}
   margin-bottom:20px;
}
.release{
    margin-top:12px;
    padding:0px;
    margin-bottom:20px;
}
`;
const Container = styled.div`
${'' /* background:pink; */}
background:rgb(219,231,231);
padding: 0 calc(3.5vw + 10px);
`;

const TopContainer = styled.div`
${'' /* background:rgb(219,231,231); */}
height:115px;
margin-top:5px;

display:flex;
`;

const Poster = styled.div`
padding:15px;
width:60px;
height:80px;
img{
    max-width:100%;
max-height:100%;
}
`;