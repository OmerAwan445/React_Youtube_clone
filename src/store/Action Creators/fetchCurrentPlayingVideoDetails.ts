import axios from "axios";
import { RootStore } from "../rootStore";
import { parseCurrentlyPlayingVideoData } from "../../utils/parseCurrentlyPlayingVideoData";
import { WatchSlice } from "../Slices/WatchSlice";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const {addCurrentPlayingVideoDetails} =WatchSlice.actions

export function fetchCurrentPlayingVideoDetails(id:string){
    return async (dispatch:typeof RootStore.dispatch) => {
    const {data: {items}}=await axios.get(`${API_ENDPOINT}/videos?part=statistics&part=snippet&id=${id}&key=${API_KEY}`);
    const parsedData= await parseCurrentlyPlayingVideoData(items[0]);
        dispatch(addCurrentPlayingVideoDetails(parsedData))
}
}