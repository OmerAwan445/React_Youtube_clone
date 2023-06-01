import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import { useParams } from 'react-router-dom';
import { WatchSlice } from '../store/Slices/WatchSlice';
import { fetchCurrentPlayingVideoDetails } from '../store/Action Creators/fetchCurrentPlayingVideoDetails';
import VideoDescription from '../Components/VideoDescription';
import VideoPlayer from '../Components/VideoPlayer';
import { fetchSimilarCatagoryVideos } from '../store/Action Creators/fetchSimilarCatagoryVideos';
import { BiLike, BiDislike } from "react-icons/bi";
import { HiScissors } from "react-icons/hi";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaShare } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import SimilarVideos from '../Components/SimilarVideos';

const Watch = () => {
  const dispatch =useAppDispatch();
  const {clearCurrentPlayingAndSimilarCatagoriesVideos} = WatchSlice.actions;
  const currentPlaying = useAppSelector(state => state.watch.currentPlaying);
  const {id}= useParams();
  useEffect(()=>{
    if(id)
    {
      // fetches the data and dispatch action to save currentPlaying Video
      dispatch(fetchCurrentPlayingVideoDetails(id));
      dispatch(fetchSimilarCatagoryVideos(id,false));
    }
    return ()=>{
      // When user is not on the watch Page
      dispatch(clearCurrentPlayingAndSimilarCatagoriesVideos())
    }
  },[id,dispatch,clearCurrentPlayingAndSimilarCatagoriesVideos])
 return (<>
    <Navbar />
 { currentPlaying && id
 &&
  (
  <div className="pt-16 px-16 grid gap-7 lg:grid-cols-[0.7fr_0.3fr] md:grid-cols-[minmax(1fr)]">
  {/* Video Player */}
  <div className="flex flex-col">
    <VideoPlayer videoId={currentPlaying.videoId} videoTitle={currentPlaying.videoTitle} />
    {/* Video Information */}
    <div className="flex-1">
      <h1 className="text-xl my-4">{currentPlaying.videoTitle}</h1>

      <div className="flex justify-between my-2">
                      <div className="text-sm text-gray-400 flex">
                      <img className='shadow-lg shadow-slate-800 rounded-full h-9 inline-block mr-3' src={currentPlaying.channel.image} alt={currentPlaying.channel.name} />
                    <div className='ml-1 flex flex-col'>
                    <span className='text-gray-400 hover:text-white'>
                      {currentPlaying.channel.name}
                    </span>
                    <div>
                    <span className="after:content-['•'] after:mx-1">
                          {currentPlaying.videoViews} views
                        </span>
                        <span>{currentPlaying.videoUploadedTime}</span>
                    </div>
                    </div>
                      </div>
                      <div className="flex items-center gap-4 uppercase">
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiLike className="text-xl" />
                          <strong>{currentPlaying.videoLikes}</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BiDislike className="text-xl" />
                          <strong>dislike</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <FaShare className="text-xl" />
                          <strong>share</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <HiScissors className="text-xl" />
                          <strong>clip</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <MdOutlinePlaylistAdd className="text-xl" />
                          <strong>save</strong>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <BsThreeDots className="text-xl" />
                        </div>
                      </div>
                    </div>
      {/* Video Description and Comments section */}
     <VideoDescription videoDescription={currentPlaying.videoDescription} />
    </div>
  </div>
  {/* Similar Catagory Videos Cards */}
  <div>
  <SimilarVideos id={id}/>
  </div>
  </div>
 )}
 </>
  );
 }
export default Watch;
