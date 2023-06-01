import React from 'react';

const VideoPlayer:React.FC<{videoId:string,videoTitle:string}> = ({videoId,videoTitle}) => {
 return (
    <div className="aspect-w-16 aspect-h-9 h-[34rem]">
     <iframe
  className='w-full h-full'
  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
  title={videoTitle}
  allow="autoplay; encrypted-media; picture-in-picture"
  allowFullScreen
></iframe>
    </div>
 )
}

export default VideoPlayer;
