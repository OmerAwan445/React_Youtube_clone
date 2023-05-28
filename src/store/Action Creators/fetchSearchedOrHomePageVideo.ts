import axios from "axios";
import { RootStore } from "../rootStore";
import { HomeAndSearchPageVideos } from "../../types";
import { parseData } from "../../utils/parseData";
import { YoutubeAppSlice } from "../Slices/YoutubeAppSlice";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

// ============== Action Creator =========
export const fetchSearchedOrHomePageVideo = (isNext: boolean, searched = "") => {
  return async (dispatch: typeof RootStore.dispatch) => {
    // IFEI Function
    const { parsedItems, nextPageToken } = await (async () => {
      const nextPageTokenParam = isNext
        ? `pageToken=${RootStore.getState().youtubeApp.nextpageToken}&`
        : "";
      const {
        data: { items, nextPageToken },
      } = await axios.get(
        `${API_ENDPOINT}/search?maxResults=20&q=${searched==='' ? '' :searched}&key=${API_KEY}&part=snippet&type=video&${nextPageTokenParam}`
      );
      const parsedItems: HomeAndSearchPageVideos[] = await parseData(items);
      return { parsedItems, nextPageToken };
    })();
    // when searched is empty (it means this action creator os dispatch for Recommended videos) then show recommended videos
    dispatch(YoutubeAppSlice.actions.addVideos({ parsedItems, nextPageToken }));
};
};
