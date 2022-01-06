// import React from 'react'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { useEffect } from 'react'
// import styled from 'styled-components'
// import { useSelector } from 'react-redux'
// import { setCast } from '../features/movie/castSlice'
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
// import { selectCasts } from '../features/movie/castSlice'
// export const MoreDetail = () => {
//     const data = useSelector(selectCasts)
//     const crew_data = data.crew
//     console.log(crew_data)
//     const {id} = useParams();
//     const dispatch = useDispatch();
//     // console.log(id)
//     const fetchData = async() =>{
//         const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=74de71d03e661d70414e23b100e51515&language=en-US`).catch((e)=>{
//           console.log('error in fetching')
//         })
//         // console.log("CAST:",response.data)
//         dispatch(setCast(response.data))
//     }

    
//     {crew_data && {}}
//     // console.log(director)
//     useEffect(() => {
//         fetchData();
//     }, [dispatch,id])
//     return (
//         <Container>
//             More Detail
//         </Container>
            
//     )
// }

// const Container = styled.div`
//     background:white;
// `;