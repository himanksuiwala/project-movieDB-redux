import React from 'react'
import { useSelector } from 'react-redux'
import { selectDetails } from '../features/movie/movieSlice'
import styled from 'styled-components'
import '../Detail.css'
const Crew = () => {
    const data = useSelector(selectDetails)
    console.log("Title",data)
    var year = new Date(data.release_date).getFullYear()
    return (
        <Content>
         <div className='title'>
        <p> {data.original_title} </p>
        </div>
        <div className='year'>
        {
         <p>({year})</p>
        }
        </div> 
        </Content>
    )
}

export default Crew

const Content = styled.div`
display:flex;
margin-right:50px;
 flex-direction:row;
 margin-left:40px;
 margin-top:42px;
`;
 {/* const Title = styled.div`
 display:flex;
 margin-right:50px;
 flex-direction:row;
 margin-left:40px;
 margin-top:42px;
 `; */}