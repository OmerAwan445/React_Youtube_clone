import axios from "axios";

import { HomeAndSearchPageVideos } from "../types";
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

  /* returns the array of indexes of the matched channels so that image should be updated on all those indexes */
  function findIndixes(parsedData:HomeAndSearchPageVideos[], id:string):number[] {
    return parsedData.reduce((indexesArr:number[],data,i:number)=>{
    if(data.channel.id === id)
   {indexesArr.push(i)}
   return indexesArr;
  },[]);
}

export async function parseData(items: any[]) {
  const parsedData: HomeAndSearchPageVideos[] = [];
  const videoIds: string[] = [];
  for (const item of items) {
    const { videoId } = item.id;
    const { channelId, title, description, publishedAt, channelTitle, thumbnails: { medium: { url } } } =
      item.snippet;
    videoIds.push(videoId);
    const publishedTime = formatPublishedDuration(new Date(publishedAt));
    parsedData.push({
      videoTitle: title,
      videoLink: `https://www.youtube.com/watch?v=${videoId}`,
      videoDescription: description,
      videoThumbnail: url,
      videoDuration: "",
      videoViews: "",
      videoUploadedTime: publishedTime,
      videoId:videoId,
      channel: {
        id: channelId,
        name: channelTitle,
        image: ""
      }
    });
  }

// getting the channels images by making api call and saving these images of channels in parseData.channel.imgs
  async function getChannelImages(data:HomeAndSearchPageVideos[]){
    const channelsId:any[] = [];
    data.forEach(item =>{
      channelsId.push(item.channel.id);
    })
  const {data:{items}} = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelsId.join(',')}&key=${API_KEY}`);
  return items;
  }

const channelsImg:any[] = await getChannelImages(parsedData);
const videosDurationViews = await getVideos_Duration_View(videoIds);


channelsImg.forEach((item) =>{
 const {snippet:{thumbnails:{default:{url}}} ,id } = item;
 const foundIndexes= findIndixes(parsedData,id);
 foundIndexes.forEach(index =>{
    parsedData[index].channel.image =url;
  })
})
videosDurationViews.forEach((videoDurationView, i) => {
    parsedData[i].videoDuration = videoDurationView.duration;
    parsedData[i].videoViews = videoDurationView.viewCount;
  });
  return parsedData;
}



