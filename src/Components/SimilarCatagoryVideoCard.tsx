import React from 'react';
import { Link } from 'react-router-dom';
import { SimilarCatagoryVideos } from '../types';

const SimilarCatagoryVideoCard = ({ video }: { video: SimilarCatagoryVideos }) => {
 return (
<div className="w-full group mb-6 grid grid-cols-2 drop-shadow-2xl">
    <div className='relative w-11/12'>
    <Link to={`/watch/${video.videoId}`}>
      <img
        className='rounded-xl transition-all delay-150 duration-500 hover:rounded-none w-full'
        src={video.videoThumbnail}
        alt={video.videoTitle}
      />
    <span className='transition-opacity delay-150 duration-500 ease-out absolute bottom-1.5 right-1 opacity-100 group-hover:opacity-0 text-center text-sm bg-black p-0.5'>
      {video.videoDuration}
    </span>
    </Link>
    </div>

    <div className='flex flex-col'>
      <Link to={`/watch/${video.videoId}`} className='line-clamp-2 hover:text-white'>
    {video.videoTitle}
      </Link>
      <div className='mt-1'>
        <span className='text-gray-400 hover:text-white'>
          {video.channel.name}
        </span>
      <Link to={`/watch/${video.videoId}`} >
        </Link>
      </div>
        <div className=''>
        <span className='text-gray-400 mr-1'>{video.videoViews} &bull; </span>
        <span className='text-gray-400'>{video.videoUploadedTime}</span>
        </div>
    </div>
</div>
 )
}

export default SimilarCatagoryVideoCard;