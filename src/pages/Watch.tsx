import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { useParams } from 'react-router-dom';
import { CurrentlyPlaying } from '../types';
import { WatchSlice } from '../store/Slices/WatchSlice';
import { fetchCurrentPlayingVideoDetails } from '../store/Action Creators/fetchCurrentPlayingVideoDetails';
import VideoDescription from '../Components/VideoDescription';
import VideoPlayer from '../Components/VideoPlayer';
import { fetchHomePageVideo } from '../store/Action Creators/fetchHomePageVideo';

const Watch = () => {
  const dispatch =useAppDispatch();
  const {clearCurrentPlayingAndRecommendedVideos} = WatchSlice.actions;
  const {currentPlaying,} = useAppSelector(state => state.watch);
   const {id}= useParams();
  useEffect(()=>{
    if(id)
    {
      // fetches the data and dispatch action to save currentPlaying Video
      dispatch(fetchCurrentPlayingVideoDetails(id))
    }
    return ()=>{
      // When user is not on the watch Page
      dispatch(clearCurrentPlayingAndRecommendedVideos())
    }
  },[id,dispatch,clearCurrentPlayingAndRecommendedVideos])
  console.log(currentPlaying);

  /*  What data I need Here are
 (Get These From rootStroe.YoutubeApp) videoId, videoTitle, channelImage, channelName, VideoViews, VideoUploadedTime,VideoDescription
 (Fetch Those) ChannelSubscribers,VideoLikes,
  */
 return (<>
    <Navbar />
 { currentPlaying
 &&
  ( <div className="pt-16 px-16 grid gap-7 lg:grid-cols-[0.7fr_0.3fr] md:grid-cols-[minmax(1fr)]">
  {/* Video Player */}
  <div className="flex flex-col">
    <VideoPlayer videoId={currentPlaying.videoId} videoTitle={currentPlaying.videoTitle} />
    {/* Video Information */}
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">{currentPlaying.videoTitle}</h1>
      <div className="flex items-center mb-2">
        <img
          src={currentPlaying.channel.image}
          alt={currentPlaying.channel.name}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-white-700 cursor-pointer hover:text-gray-400">{currentPlaying.channel.name}</span>
      </div>
     <VideoDescription videoDescription={currentPlaying.videoDescription} />
    </div>
  </div>
  {/* Recommended Videos Cards */}
  <div className="border border-solid border-zinc-400">
    Recommended Videos Cards
  </div>
</div>)}

 </>
 )
}

export default Watch;