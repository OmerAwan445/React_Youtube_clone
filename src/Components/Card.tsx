import React from 'react';
import { HomeAndSearchPageVideos } from '../types';
import { Link } from 'react-router-dom';
const Card = ({ video }: { video: HomeAndSearchPageVideos }) => {
  return (
    <div className='group flex flex-col cursor-pointer '>
      <div className='relative'>
        <span className='transition-opacity delay-150 duration-500 ease-out absolute bottom-2 right-1 opacity-100 group-hover:opacity-0 text-center text-sm bg-black p-0.5'>
          {video.videoDuration}
        </span>
        <Link to={`/watch/${video.videoId}`}>
          <img
            className='rounded-xl transition-all delay-150 duration-500 hover:rounded-none w-full'
            src={video.videoThumbnail}
            alt={video.videoTitle}
          />
        </Link>
      </div>
      <div className='flex mt-4 gap-2'>
        <img className='rounded-full h-8' src={video.channel.image} alt='' />
        <div className='flex flex-col justify-evenly'>
          <Link to={`/watch/${video.videoId}`} className='line-clamp-2 hover:text-white'>
            {video.videoTitle}
          </Link>
          <div>
            <span className='text-gray-400 hover:text-white'>
              {video.channel.name}
            </span>
          <Link to={`/watch/${video.videoId}`} >
            <div>
            <span className='text-gray-400 mr-1'>{video.videoViews} &bull; </span>
            <span className='text-gray-400'>{video.videoUploadedTime}</span>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Card;