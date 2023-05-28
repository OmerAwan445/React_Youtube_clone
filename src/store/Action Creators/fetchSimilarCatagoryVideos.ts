import axios from "axios";
import { RootStore } from "../rootStore";
import { SimilarCatagoryVideos } from "../../types";
import { parseSimilarCatagoryVideos } from "../../utils/parseSimilarCatagoryVideos";
import { WatchSlice } from "../Slices/WatchSlice";
const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

// ============== Action Creator
export const fetchSimilarCatagoryVideos = (relatedToVideoId:string,isNext=false) => {
  return async (dispatch: typeof RootStore.dispatch) => {
    const {addSimilarCatagoriesVideoDetails} =WatchSlice.actions
    const nextPageTokenParam = isNext
    ? `pageToken=${RootStore.getState().watch.similarCatagoriesVideoDetails.nextPageToken}`
    : "";
    const {data:{items,nextPageToken}} = await axios.get(`${API_ENDPOINT}/search?part=snippet&maxResults=20&relatedToVideoId=${relatedToVideoId}&type=video&key=${API_KEY}&${nextPageTokenParam}`);
    const parsedItems: SimilarCatagoryVideos[] = await parseSimilarCatagoryVideos(items);
  dispatch(addSimilarCatagoriesVideoDetails({nextPageToken,videos:[...parsedItems]}));
  };
};
