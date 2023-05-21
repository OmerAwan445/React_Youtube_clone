import { HomePageVideos, InitialState } from "../../types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AddVideosPayload {
    parsedItems: HomePageVideos[],
    nextPageToken:string
  }


const initialState:InitialState = {
    videos:[],
    nextpageToken:""
}

export const YoutubeAppSlice = createSlice({
    name: "YOUTUBE_APP",
    initialState,
    reducers:{
    addVideos:(state,actions:PayloadAction<AddVideosPayload>)=>{
    state.videos= state.videos.concat(actions.payload.parsedItems);
    state.nextpageToken=actions.payload.nextPageToken;
    },
    clearVideos:(state)=>{
    state.videos=[]
    state.nextpageToken=''
    }
    },
});

export const clearVideos = YoutubeAppSlice.actions.clearVideos;



