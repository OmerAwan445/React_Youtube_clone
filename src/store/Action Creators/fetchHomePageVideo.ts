import axios from "axios";
import { RootStore } from "../rootStore";
import { HomePageVideos } from "../../../types";
import { parseData } from "../../utils/parseData";
import { HomePageSlice } from "../Slices/HomePageSlice";



const API_KEY= process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

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