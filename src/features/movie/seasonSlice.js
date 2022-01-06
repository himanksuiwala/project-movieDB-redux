import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
    season:[]
}

const seasonSlice = createSlice({

    name:"seasons",
    initialState,
    reducers:{

        setSeason:(state,action)=>{
            state.season = action.payload;
        }

    }

})

export const {setSeason} = seasonSlice.actions;

export const selectSeasons = (state) => state.seasons.season;

export default seasonSlice.reducer;