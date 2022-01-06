import React from 'react'
import { selectDetails } from '../features/movie/movieSlice'
import { selectCasts } from '../features/movie/castSlice'
import { useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import axios from 'axios'
import './Cast.css'
import styled from 'styled-components'
const Cast = () => {
// const [castdata,setCastdata] = useState([])
// const data = useSelector(selectDetails)
const creditdata = useSelector(selectCasts);
const castdata = creditdata;
console.log("cre",castdata);
const baseUrl = "https://image.tmdb.org/t/p/original"
 
// console.log("cast",castdata)
// setCastdata(data)
    return (
        <div>
        <h2>Top Billed Cast</h2>
        <div className='castcontainer'>
       {
          castdata  && castdata.slice(0,5).map((i)=>{

                if(!i.profile_path){
                    return(
                    <div className="actor">
                        <div className='image-container'>
                        <img className='photo' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"  />
                        {/* <p>No Pohot</p> */}
                        </div>
                    <div className='actor-name'>
                        <p>{i.name}</p>
                    </div>
                    <div className='movie-name'>
                        <p>{i.character}</p>
                     </div>
                    </div>
                   )
                }

              return(
                    <div className="actor">
                        <div className='image-container'>
                        <img className='photo' src={`${baseUrl}${i.profile_path}`} />
                        </div>
                    <div className='actor-name'>
                        <p>{i.name}</p>
                    </div>
                    <div className='movie-name'>
                        <p>{i.character}</p>
                     </div>
                    </div>
                   )
          })
       }
        </div>
        </div>
    )
    return (
        <div></div>
    )
}
export default Cast

const CastPoster =styled.div`

.posterc{
    ${'' /* display:flex; */}
    background:yellow;
margin:10px



.name{
    margin-top:20px;
};

`;

const Container = styled.div`
background:white;
background:pink;


`;

const CastContainer = styled.div`
background:blue;
`;