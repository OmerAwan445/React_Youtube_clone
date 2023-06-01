import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import {useAppDispatch, useAppSelector} from '../store/storeHooks';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Components/Spinner';
import { fetchSearchedOrHomePageVideo } from '../store/Action Creators/fetchSearchedOrHomePageVideo';
import SearchedVideoCard from '../Components/SearchedVideoCard';

const Search = () => {
const {videos} = useAppSelector(state=>state.youtubeApp);
const dispatch = useAppDispatch();
const searchTerm = useAppSelector(state => state.search.searchTerm );

useEffect(()=>{
  dispatch(fetchSearchedOrHomePageVideo(false,searchTerm));
},[searchTerm,dispatch]);
  return (
  <>
    <div>
      <Navbar searchTerm={searchTerm}/>
        <Sidebar />
         <InfiniteScroll
          className='video_sec'
          dataLength={videos.length}
          next={()=>dispatch(fetchSearchedOrHomePageVideo(true,searchTerm))}
          hasMore={videos.length<=500}
          loader={<Spinner/>}
          height={200}
          style={{height:"100vh"

        }}
        >
        <div className='pl-48 pt-24 mx-auto grid w-10/12 grid-rows-[repeat(auto-fit,minmax(200px,1fr))] gap-x-5 gap-y-10'>
    {videos?.map((item,index)=><SearchedVideoCard key={index} video={item} />)}
      </div>
        </InfiniteScroll>
   </div>
   </>
  )
}

export default Search;