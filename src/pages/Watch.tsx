import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { useParams } from 'react-router-dom';
import { CurrentlyPlaying } from '../types';
import { WatchSlice } from '../store/Slices/WatchSlice';

const Watch = () => {
  const dispatch =useAppDispatch();
  const {addCurrentPlayingVideoDetails,clearCurrentPlayingAndRecommendedVideos} = WatchSlice.actions;
  const {videos} = useAppSelector(state=>state.youtubeApp);
  const {currentPlaying,} = useAppSelector(state => state.watch);
  const {id}= useParams();
  useEffect(()=>{

    function getCurrentVideoDetails():CurrentlyPlaying{
    const foundVideoIndex = videos?.findIndex((video)=>video.videoId === id );
    return {
      videoTitle: videos[foundVideoIndex].videoTitle,
      videoDescription:videos[foundVideoIndex].videoDescription,
      videoViews:videos[foundVideoIndex].videoViews,
      videoUploadedTime:videos[foundVideoIndex].videoUploadedTime,
      videoId:videos[foundVideoIndex].videoId,
      videoLikes:'',
      channel:{
          id:videos[foundVideoIndex].channel.id,
          name:videos[foundVideoIndex].channel.name,
          image:videos[foundVideoIndex].channel.image,
          subscribers:'',
        }
      }
    }
    const videoDetails = getCurrentVideoDetails();
    dispatch(addCurrentPlayingVideoDetails({...videoDetails}));
    return ()=>{
      // When user is not on the watch Page
      dispatch(clearCurrentPlayingAndRecommendedVideos())
    }
  },[id,dispatch,videos,addCurrentPlayingVideoDetails,clearCurrentPlayingAndRecommendedVideos])

  console.log(currentPlaying);

  /*  What data I need Here are
 (Get These From rootStroe.YoutubeApp) videoId, videoTitle, channelImage, channelName, VideoViews, VideoUploadedTime,VideoDescription
  (Fetch Those) ChannelSubscribers,VideoLikes,
  */
  // console.log(videos);
 return (<>
    <Navbar />
 <div className="pt-16 px-16 grid gap-7 lg:grid-cols-[0.7fr_0.3fr] md:grid-cols-[minmax(1fr)]">
  {/* Video Player */}
  <div className="flex flex-col">
    <div className="flex-1">
      <div className="aspect-w-16 aspect-h-9 h-[34rem]">
        <iframe
          className='w-full h-full'
          src="http://www.youtube.com/embed/kFnoD02gADs"
          title="adasd"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
    {/* Video Information */}
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-4">Video Title</h1>
      <div className="flex items-center mb-2">
        <img
          src="profile.jpg"
          alt="Channel Profile"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="text-gray-700">Channel Name</span>
      </div>
      <p className="text-gray-600 mb-4">Video description goes here.</p>

      {/* Comments */}
      <div>
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        <div className="border-t border-gray-300 py-4">
          {/* Comment components */}
        </div>
      </div>
    </div>
  </div>
  {/* Recommended Videos Cards */}
  <div className="border border-solid border-zinc-400">
    Recommended Videos Cards
  </div>
</div>

 </>
 )
}

export default Watch;