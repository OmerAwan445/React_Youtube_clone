import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import {useAppDispatch, useAppSelector} from '../store/storeHooks';
import Videos from '../Components/Videos';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Components/Spinner';
import { fetchHomePageVideo } from '../store/Action Creators/fetchHomePageVideo';

const Search = () => {
const {videos} = useAppSelector(state=>state.youtubeApp);

const dispatch = useAppDispatch();
const searchTerm = useAppSelector(state => state.search.searchTerm );
console.log(searchTerm,videos);
useEffect(()=>{
  dispatch(fetchHomePageVideo(false,searchTerm));
},[searchTerm,dispatch]);
console.log("search");
  return (
  <>
    <div>
      <Navbar />
        <Sidebar />
         <InfiniteScroll
          className='video_sec '
          dataLength={videos.length}
          next={()=>dispatch(fetchHomePageVideo(true,searchTerm))}
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

export default Search;