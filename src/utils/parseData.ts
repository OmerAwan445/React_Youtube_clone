import axios from "axios";

import { HomePageVideos } from "../../types";
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

  /* returns the array of indexes of the matched channels so that image should be updated on all those indexes */
  function findIndixes(parsedData:HomePageVideos[], id:string):number[] {
    return parsedData.reduce((indexesArr:number[],data,i:number)=>{
    if(data.channel.id === id)
   {indexesArr.push(i)}
   return indexesArr;
  },[]);
}

export async function parseData(items: any[]) {
  const parsedData: HomePageVideos[] = [];
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
  async function getChannelImages(data:HomePageVideos[]){
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



