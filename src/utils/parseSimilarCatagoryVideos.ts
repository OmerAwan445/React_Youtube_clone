import axios from "axios";

import { SimilarCatagoryVideos } from "../types";
const API_KEY= process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

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

function formatViews(views: string): string {
    const viewCount: number = parseInt(views, 10);

    if (viewCount >= 1000000000) {
      return Math.floor((viewCount / 1000000000)) + 'B';
    }
    if (viewCount >= 1000000) {
      return Math.floor((viewCount / 1000000)) + 'M';
    }
    if (viewCount >= 1000) {
      return Math.floor(((viewCount / 1000))) + 'K';
    }

    return views;
  }

  function formatISOTime(youtube_time: string):string {
    let array = youtube_time.match(/(\d+)(?=[MHS])/gi) || [];
    const formatted = array
      .map(function (item) {
        if (item.length < 2) return "0" + item;
        return item;
      })
      .join(":");
    return formatted.length<=2 ?formatted+":00":formatted;
  }

async function getVideos_Duration_View(videosId: any[]) {
    const URL =
      "https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&";
    const {data: { items }} = await axios.get(`${URL}id=${videosId.join(",")}&key=${API_KEY}`);
    const data:any[]= await items.map((item: any) => {
     const duration:string = formatISOTime(item.contentDetails.duration);
        const viewCount  = formatViews(item.statistics.viewCount);
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

// getting the channels images by making api call and saving these images of channels in parseData.channel.imgs

const videosDurationViews = await getVideos_Duration_View(videoIds);

videosDurationViews.forEach((videoDurationView, i) => {
    parsedData[i].videoDuration = videoDurationView.duration;
    parsedData[i].videoViews = videoDurationView.viewCount;
  });
  return parsedData;
}



