import React from 'react';
import { useAppSelector } from '../store/storeHooks';
import Card from './Card';

const Vidoes = () => {
    const {videos} = useAppSelector(state=>state.youtubeApp);
   return (
    <div className='pl-48 pt-24 grid w-10/12 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-5 gap-y-10'>
    {videos?.map((item,index)=><Card key={index} video={item} />)}
  </div>
 )
}

export default Vidoes;