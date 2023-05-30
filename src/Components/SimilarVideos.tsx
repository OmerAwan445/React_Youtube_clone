import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchSimilarCatagoryVideos } from '../store/Action Creators/fetchSimilarCatagoryVideos';
import Spinner from './Spinner';
import SimilarCatagoryVideoCard from './SimilarCatagoryVideoCard';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';

const SimilarVideos:React.FC<{id:string}> = ({id}) => {
    const {similarCatagoriesVideoDetails:{videos}} = useAppSelector(state => state.watch);
    const dispatch = useAppDispatch();
 return (
    <div className='min-h-full'>
    <InfiniteScroll
          className='video_sec'
          dataLength={videos?.length}
          next={()=>dispatch(fetchSimilarCatagoryVideos(id,true))}
          hasMore={videos.length <= 500}
          loader={<Spinner/>}
          style={{overflow:"none"}}
        >
    <div>
    {videos?.map((item,index)=><SimilarCatagoryVideoCard key={index} video={item} />)}
    </div>
    </InfiniteScroll>
    </div>
 )
}

export default SimilarVideos;