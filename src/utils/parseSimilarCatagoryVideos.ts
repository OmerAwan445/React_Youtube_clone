import axios from "axios";

import { SimilarCatagoryVideos } from "../types";
import { formatISOTime, formatPublishedDuration, formatStatistics } from "./formatDataFunctions";
const API_KEY= process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

async function getVideos_Duration_View(videosId: any[]) {
    const URL =
      "https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&";
    const {data: { items }} = await axios.get(`${URL}id=${videosId.join(",")}&key=${API_KEY}`);
    const data:any[]= await items.map((item: any) => {
     const duration:string = formatISOTime(item.contentDetails.duration);
        const viewCount  = formatStatistics(item.statistics.viewCount);
        return {duration , viewCount };
    });
     return data;
  }

export async function parseSimilarCatagoryVideos(items: any[]) {
  const parsedData: SimilarCatagoryVideos[] = [];
  const videoIds: string[] = [];
  for (const item of items) {
    const { videoId } = item.id;
    const { channelId, title, publishedAt, channelTitle, thumbnails: { medium: { url } } } =
      item.snippet;
    videoIds.push(videoId);
    const publishedTime = formatPublishedDuration(new Date(publishedAt));
    parsedData.push({
      videoTitle: title,
      videoThumbnail: url,
      videoDuration: "",
      videoViews: "",
      videoUploadedTime: publishedTime,
      videoId:videoId,
      channel: {
        id: channelId,
        name: channelTitle,
      }
    });
  }


const videosDurationViews = await getVideos_Duration_View(videoIds);

videosDurationViews.forEach((videoDurationView, i) => {
    parsedData[i].videoDuration = videoDurationView.duration;
    parsedData[i].videoViews = videoDurationView.viewCount;
  });
  return parsedData;
}



