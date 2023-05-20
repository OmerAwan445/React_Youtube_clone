import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import {useAppDispatch, useAppSelector} from '../store/storeHooks';
import Videos from '../Components/Videos';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Components/Spinner';
import { fetchHomePageVideo } from '../store/Action Creators/fetchHomePageVideo';


const Home = () => {
  const {videos} = useAppSelector(state=>state.homePage);
const dispatch = useAppDispatch();
useEffect(() => {
  dispatch(fetchHomePageVideo(false));
},[dispatch])
console.log(videos);
  return (
  <>
    <div>
      <Navbar />
        <Sidebar />
         <InfiniteScroll
          className='video_sec '
          dataLength={videos.length}
          next={()=>dispatch(fetchHomePageVideo(true))}
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