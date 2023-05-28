import axios from "axios";

import { CurrentlyPlaying } from "../types";
import { formatPublishedDuration, formatStatistics } from "./formatDataFunctions";
const API_KEY= process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function parseCurrentlyPlayingVideoData(item:any) {
    const { id } = item;
    const {likeCount,viewCount} = item.statistics;
    const { channelId, title, description, publishedAt, channelTitle} = item.snippet;
    const formatedViewCount = formatStatistics(viewCount);
    const publishedTime = formatPublishedDuration(new Date(publishedAt));
    const parsedData:CurrentlyPlaying ={
      videoTitle: title,
      videoDescription: description,
      videoViews: formatedViewCount,
      videoUploadedTime: publishedTime,
      videoId:id,
      videoLikes:formatStatistics(likeCount),
      channel: {
        id: channelId,
        name: channelTitle,
        image: "",
        subscribers:""
      }
    }

// getting the channels images by making api call and saving these images of channels in parseData.channel.imgs
  async function getChannelDetails(channelId:string){
  const {data:{items}} = await axios.get(`${API_ENDPOINT}/channels?part=snippet,statistics&id=${channelId}&key=${API_KEY}`);
  const {snippet:{thumbnails:{default:{url}}}} =items[0];
  const {statistics:{subscriberCount}} =items[0];
  return {url,subscriberCount};
  }

const {url,subscriberCount} = await getChannelDetails(channelId);
    parsedData.channel.image=url;
    parsedData.channel.subscribers=formatStatistics(subscriberCount);
        return parsedData;
}