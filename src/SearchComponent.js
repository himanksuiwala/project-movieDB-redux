import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { setsearchData } from './features/movie/searchSlice';
import { fetchAsyncMovies, fetchAsyncSearch } from './features/movie/movieSlice';
import { useSelector } from 'react-redux';
import { getSearchData } from './features/movie/movieSlice';
const API_KEY = "74de71d03e661d70414e23b100e51515";

export const SearchComponent = () => {
    const [term,setTerm] = useState("");
    const dispatch = useDispatch();
    // const data = useSelector(getSearchData)

    const fetchsearch = async(term)=>{
        const response = await axios.get(`
      https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=money&page=1&include_adult=false
      `).catch((e)=>{
          console.log("Error fetching Search Data");
      })
     dispatch(setsearchData(response.data))
    }

    const submitHandler =(e)=>{
        e.preventDefault();
        // fetchsearch(term);
        console.log("Searching For",term)
      setTerm("");
    }
    return (
        <Main>
        {/* <div classname ='container'>
        <h1>Search component</h1>
        </div> */}
        <div className='text-container'>
            <div className='container'>
                <h1>Welcome!</h1>         
                <h1>Explore from Millions of movies, shows</h1>         
            </div>
        </div>
        <div className="search-bar" >
            <form className='form' onSubmit={submitHandler}>
                <input id="searchQueryInput"
                // name="searchQueryInput"
                type="text"
                value={term}
                placeholder="Search for a movie, tv show..."
                onChange = {(e)=>setTerm(e.target.value)}
                />
                <Link to={{
                    pathname:`/search/${term}`,
                    state:"Search",
                }}>
                <button className='Search-button'><BsSearch/></button>
                </Link>
            </form>
        </div>
        </Main>
    )
}

const Main = styled.div`
background-color:#F08D7E;
color:white;
height:385px;
${'' /* .form{
    width:500px;
} */}

.text-container{
    padding-left:250px;
    ${'' /* margin-left:175px; */}
    display:flex;
}

.container{
    ${'' /* color:green;
    padding:100px; */}
    h1{
        display:flex;
    }
    margin-top:60px;
}
${'' /* margin-top:50px; */}
.search-bar{
    width: 100%;
   display: flex;
  justify-content: center;
    padding :10px;
  ${'' /* flex-direction: row; */}
  margin: 5 calc(12vw + 10px);
  margin-top:30px;
  ${'' /* align-items: center; */}
}
#searchQueryInput {
  ${'' /* width: 100%; */}
  width:60vw;
  height: 2.8rem;
  background: #E2BAB1;
  outline: none;
  border: none;
  border-radius: 1.625rem;
  padding: 0 3.5rem 0 1.5rem;
  font-size: 1rem;
}

.Search-button{
    ${'' /* background-color: #000000;
        color: #FFFFFF;
        padding: 10px;
        border:none;
        height:40px;
        border-radius: 10px;
        -moz-border-radius: 10px;
        -webkit-border-radius: 10px;
        margin:10px */}

        ${'' /* display:block; */}
  height: 45px;
  width: 45px;
  border-radius: 50%;
  border: 1px none ;
  margin:5px;
  background:#ACAEC5
}
.Search-button:after {
	content: '';
	position: absolute;
	z-index: -1;
	-webkit-transition: all 0.3s;
	-moz-transition: all 0.3s;
	transition: all 0.3s;
}
`;

const Container = styled.div`
background-color:green;
${'' /* margin-top:50px; */}
padding:100px;

`;

const SearchBarContainer = styled.div`
display:flex;
padding:15px;
${'' /* width:60vw; */}

${'' /* margin: 10px; */}

${'' /* margin: 0 calc(12vw + 10px); */}
${'' /* margin-left:10px; */}

`;