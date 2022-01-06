import React from 'react'
import { useSelector } from 'react-redux'
import {getSelectedMovieOrShow} from "../features/movie/movieSlice"
import styled from 'styled-components'
const Stats = () => {

    const data = useSelector(getSelectedMovieOrShow)
    
    {   data.networks &&  data.networks.map((item)=>{
        // console.log(item.name)
    })

    }

    // console.log("as",data)
  
    return (
         <Container>
         <Budget>
         <h3>Budget</h3>
         <p>${data.budget}</p>
         </Budget>
         <Language>
         <h3>Spoken Language</h3>
         {data.spoken_languages  && data.spoken_languages.map((l)=>{
                 return(
                     <p key={data.id}>{l.english_name}</p>
                 )})
         }
         </Language>
         <Revenue>
             <p>${data.revenue}</p>    
         </Revenue>
         </Container>
        
    )
}

export default Stats

const Container = styled.div`
background:blue;
width:50vw;
margin-left:30px;
`;

const Budget = styled.div``;

const Language = styled.div``;

const Revenue = styled.div``;