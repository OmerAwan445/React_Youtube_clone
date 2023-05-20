import axios from "axios";
import { HomePageVideos, InitialState } from "../../../types";
import { RootStore } from "../rootStore";
import { parseData } from "../../utils/parseData";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const API_KEY= process.env.REACT_APP_YOUTUBE_DATA_API_KEY;


interface AddVideosPayload {
    parsedItems: HomePageVideos[],
    nextPageToken:string
  }


const initialState:InitialState = {
    videos:[],
    currentPlaying:null,
    nextpageToken:""
}

export const HomePageSlice = createSlice({
    name: "HOMEPAGE",
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


// ============== Action Creator
export const fetchHomePageVideo =(isNext:boolean)=>{
    return async(dispatch:typeof RootStore.dispatch)=>{
        // IFEI Function
  const {parsedItems,nextPageToken}= await (async () =>{
    const YOUTUBE_SEARCH_URL ='https://youtube.googleapis.com/youtube/v3'
    const nextPageTokenParam = isNext ? `pageToken=${RootStore.getState().homePage.nextpageToken}&` : '';
    const { data: { items, nextPageToken } } = await axios.get(`${YOUTUBE_SEARCH_URL}/search?maxResults=20&q='JayPlays'&key=${API_KEY}&part=snippet&type=video&${nextPageTokenParam}`);
    const parsedItems:HomePageVideos[] = await parseData(items);
    return {parsedItems,nextPageToken};
})();
    dispatch(HomePageSlice.actions.addVideos({parsedItems,nextPageToken}));
}
}
