import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentlyPlaying, WatchInitialState } from "../../types";

const initialState:WatchInitialState = {
currentPlaying:null,
recommendedVideos:[]
}

export const WatchSlice =createSlice({
    name: "Watch",
    initialState,
    reducers:{
    addCurrentPlayingVideoDetails:(state,action:PayloadAction<CurrentlyPlaying>)=>{
        state.currentPlaying = {...action.payload}
    },
    clearCurrentPlayingAndRecommendedVideos:(state)=>{
        state.currentPlaying =null;
        state.recommendedVideos=[]
    }
    }
})