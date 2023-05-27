import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentlyPlaying, WatchInitialState } from "../../types";

const initialState:WatchInitialState = {
currentPlaying:null,
recommendedVideos:[]
}

/*
https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=UCFx8S2YX4DFTYicIOV5PQag&key

*/
export const WatchSlice =createSlice({
    name: "Watch",
    initialState,
    reducers:{
    addCurrentPlayingVideoDetails:(state,action:PayloadAction<CurrentlyPlaying>)=>{
        state.currentPlaying = {...action.payload}
    },
    addAdditionalFetchedVideoDetails:()=>{

    },
    clearCurrentPlayingAndRecommendedVideos:(state)=>{
        state.currentPlaying =null;
        state.recommendedVideos=[]
    }
    }
})