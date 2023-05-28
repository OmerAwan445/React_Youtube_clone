import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import {useAppDispatch, useAppSelector} from '../store/storeHooks';
import Videos from '../Components/Videos';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Components/Spinner';
import { fetchSearchedOrHomePageVideo } from '../store/Action Creators/fetchSearchedOrHomePageVideo';
import { clearVideos } from '../store/Slices/YoutubeAppSlice';
const Home = () => {
const {videos} = useAppSelector(state=>state.youtubeApp);
const dispatch = useAppDispatch();
useEffect(() => {
  dispatch(fetchSearchedOrHomePageVideo(false));
},[dispatch])

useEffect(() => {
  dispatch(clearVideos());
},[dispatch])
  return (
  <>
    <div>
      <Navbar />
        <Sidebar />
         <InfiniteScroll
          className='video_sec '
          dataLength={videos.length}
          next={()=>dispatch(fetchSearchedOrHomePageVideo(true))}
          hasMore={videos.length<=500}
          loader={<Spinner/>}
          height={1000}
          style={{height:"100vh"

        }}
        >
        <div className='flex justify-center w-full'>
       <Videos />
      </div>
        </InfiniteScroll>
   </div>
   </>
  )
}

export default Home;