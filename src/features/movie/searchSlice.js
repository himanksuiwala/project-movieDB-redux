// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     searchData:[]
// }

// const searchSlice = createSlice({

//     name:"searched",
//     initialState,
//     reducers:{
//         setsearchData:(state,action) =>{
//             state.searchData = action.payload;
//         }
//     }

// })

// export const {setsearchData} = searchSlice.actions;

// export const selectSearchData = (state) => state.searched.searchData;

// export default searchSlice.reducer;

import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    searchData:[]
}

const searchSlice = createSlice({

    name:"search",
    initialState,
    reducers:{

        setsearchData:(state,action)=>{
            state.searchData = action.payload;
        }

    }

})

export const {setsearchData} = searchSlice.actions;

export const selectSearchData = (state) => state.search.searchData;

export default searchSlice.reducer;