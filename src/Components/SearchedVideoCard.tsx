import React from 'react';
import { HomeAndSearchPageVideos } from '../types';
import { Link } from 'react-router-dom';

const SearchedVideoCard = ({ video }: { video: HomeAndSearchPageVideos }) => {
 return (
 <div className='group grid cursor-pointer grid-cols-[max-content_1fr] gap-x-4 drop-shadow-2xl'>
      <div className='relative'>
        <span className='transition-opacity mb-2 delay-150 duration-500 ease-out absolute bottom-2 right-1 opacity-100 group-hover:opacity-0 text-center text-sm bg-black p-0.5'>
          {video.videoDuration}
        </span>
        <Link to={`/watch/${video.videoId}`}>
          <img
            className='rounded-xl transition-all delay-150 duration-500 hover:rounded-none w-full '
            src={video.videoThumbnail}
            alt={video.videoTitle}
          />
        </Link>
      </div>

      <div className='flex'>
        <div className='flex flex-col'>
          <Link to={`/watch/${video.videoId}`} className='line-clamp-2 text-xl hover:text-white'>
        {video.videoTitle}
          </Link>
            <div className='my-2'>
            <span className='text-gray-400 mr-1'>{video.videoViews} &bull; </span>
            <span className='text-gray-400'>{video.videoUploadedTime}</span>
            </div>
          <div className='mt-4'>
        <img className='shadow-xl shadow-slate-800 rounded-full h-8 inline-block mr-3' src={video.channel.image} alt={video.channel.name} />
            <span className='text-gray-400 hover:text-white'>
              {video.channel.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchedVideoCard;