import axios from "axios";

import { CurrentlyPlaying } from "../types";
const API_KEY= process.env.REACT_APP_YOUTUBE_DATA_API_KEY;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;


function formatPublishedDuration(addedDate: any):string {
  const todayDate: any = new Date();
  const diff = (todayDate - addedDate) / 1000;
  const addedMinutesAgo = Math.floor(diff / 60);
  const addedHoursAgo = Math.floor(diff / (60 * 60));
  const addedDaysAgo = Math.floor(diff / (24 * 60 * 60));
  const addedMonthsAgo = Math.floor(diff / (30 * 24 * 60 * 60));
  const addedYearsAgo = Math.floor(diff / (365 * 24 * 60 * 60));

  if (addedYearsAgo > 0) {
    return `${addedYearsAgo} year${addedYearsAgo === 1 ? "" : "s"} ago`;
  } else if (addedMonthsAgo > 0) {
    return `${addedMonthsAgo} month${addedMonthsAgo === 1 ? "" : "s"} ago`;
  } else if (addedDaysAgo > 0) {
    return `${addedDaysAgo} day${addedDaysAgo === 1 ? "" : "s"} ago`;
  } else if (addedHoursAgo > 0) {
    return `${addedHoursAgo} hour${addedHoursAgo === 1 ? "" : "s"} ago`;
  } else {
    return `${addedMinutesAgo} minute${addedMinutesAgo === 1 ? "" : "s"} ago`;
  }
}

function formatStatistics(data: string): string {
    const viewCount: number = parseInt(data, 10);

    if (viewCount >= 1000000000) {
      return Math.floor((viewCount / 1000000000)) + 'B';
    }
    if (viewCount >= 1000000) {
      return Math.floor((viewCount / 1000000)) + 'M';
    }
    if (viewCount >= 1000) {
      return Math.floor(((viewCount / 1000))) + 'K';
    }

    return data;
  }

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