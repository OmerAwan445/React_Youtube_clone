import axios from "axios";
import { RootStore } from "../rootStore";
import { HomePageVideos } from "../../../types";
import { parseData } from "../../utils/parseData";
import { HomePageSlice } from "../Slices/HomePageSlice";



const API_KEY= process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
console.log(API_ENDPOINT);

// ============== Action Creator
export const fetchHomePageVideo =(isNext:boolean)=>{
    return async(dispatch:typeof RootStore.dispatch)=>{
        // IFEI Function
  const {parsedItems,nextPageToken}= await (async () =>{
    const nextPageTokenParam = isNext ? `pageToken=${RootStore.getState().homePage.nextpageToken}&` : '';
    const { data: { items, nextPageToken } } = await axios.get(`${API_ENDPOINT}/search?maxResults=20&q='JayPlays'&key=${API_KEY}&part=snippet&type=video&${nextPageTokenParam}`);
    const parsedItems:HomePageVideos[] = await parseData(items);
    return {parsedItems,nextPageToken};
})();
    dispatch(HomePageSlice.actions.addVideos({parsedItems,nextPageToken}));
}
}