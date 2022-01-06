import { createSlice } from "@reduxjs/toolkit"; 


const initialState ={
    cast:[]
}

const castSlice = createSlice({
    name:"casts",
    initialState,
    reducers:{
        setCast:(state,action)=>{
            state.cast = action.payload;
        }
    }
})

export const {setCast} = castSlice.actions;

export const selectCasts = (state) => state.casts.cast;

export default castSlice.reducer;