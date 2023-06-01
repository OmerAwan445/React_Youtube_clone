import React, { ReactNode } from 'react';
import DummyHomePageVideoCard from './DummyHomePageVideoCard';

const HomePageDummyVideos = () => {
    const dummyVideoList:ReactNode[] =[];
//   For Initialy Loading 20 Dummy Videos
    for (let i = 0; i < 20; i++) {
  dummyVideoList.push(<DummyHomePageVideoCard />)
}
 return (
    <div className='pl-48 pt-24 grid w-10/12 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-5 gap-y-10'>
    {dummyVideoList}
    </div>
 )
}

export default HomePageDummyVideos;