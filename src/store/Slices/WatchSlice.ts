import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CurrentlyPlaying, SimilarCatagoryVideos, WatchInitialState } from "../../types";

const initialState:WatchInitialState = {
currentPlaying:null,
similarCatagoriesVideoDetails:{
    nextPageToken:'',
    videos:[]
}
}

export const WatchSlice =createSlice({
    name: "Watch",
    initialState,
    reducers:{
    addCurrentPlayingVideoDetails:(state,action:PayloadAction<CurrentlyPlaying>)=>{
        state.currentPlaying = {...action.payload}
    },
    addSimilarCatagoriesVideoDetails:(state,action:PayloadAction<{nextPageToken:string,videos:SimilarCatagoryVideos[]}>)=>{
        state.similarCatagoriesVideoDetails.nextPageToken=action.payload.nextPageToken;
        state.similarCatagoriesVideoDetails.videos.push(...action.payload.videos);
    },
    clearCurrentPlayingAndSimilarCatagoriesVideos:(state)=>{
        state.currentPlaying =null;
        state.similarCatagoriesVideoDetails={
            nextPageToken:'',
            videos:[]
        }
    }
    }
})