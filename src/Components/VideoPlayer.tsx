import React from 'react';

const VideoPlayer:React.FC<{videoId:string,videoTitle:string}> = ({videoId,videoTitle}) => {
 return (
    <div className="flex-1">
    <div className="aspect-w-16 aspect-h-9 h-[34rem]">
      <iframe
        className='w-full h-full'
        src={`http://www.youtube.com/embed/${videoId}`}
        title={videoTitle}
        allowFullScreen={true}
      ></iframe>
    </div>
  </div>
 )
}

export default VideoPlayer;