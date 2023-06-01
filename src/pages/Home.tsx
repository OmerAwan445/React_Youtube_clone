import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import Videos from '../Components/Videos';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../Components/Spinner';
import { fetchSearchedOrHomePageVideo } from '../store/Action Creators/fetchSearchedOrHomePageVideo';
import { clearVideos } from '../store/Slices/YoutubeAppSlice';
import HomePageDummyVideos from '../Components/Dummy_loading_Components/HomePageDummyVideos';
import { LoadingSlice } from '../store/Slices/LoadingSlice';

const Home = () => {
  const { videos } = useAppSelector(state => state.youtubeApp);
  const { dataIsLoading, dataHasLoaded } = LoadingSlice.actions
  const { isLoading } = useAppSelector(state => state.loading)
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (videos.length === 0) dispatch(dataIsLoading());
    // videos.length <= 20 is used so that when infinite Scrolling brings more videos it is not dispatched again and again
    else if (videos.length <= 20) dispatch(dataHasLoaded());
  }, [videos, dataIsLoading, dispatch, dataHasLoaded])

  useEffect(() => {
    dispatch(fetchSearchedOrHomePageVideo(false));
  }, [dispatch])

  useEffect(() => {
    dispatch(clearVideos());
  }, [dispatch])
  return (
    <>
      <div>
        <Navbar />

        {isLoading
          ?
          <div className='flex justify-center w-full'>
            <HomePageDummyVideos />
          </div>
          : <>
            <Sidebar />
            <InfiniteScroll
              className='video_sec '
              dataLength={videos.length}
              next={() => dispatch(fetchSearchedOrHomePageVideo(true))}
              hasMore={videos.length <= 500}
              loader={<Spinner />}
              height={1000}
              style={{
                height: "100vh"

              }}
            >
              <div className='flex justify-center w-full'>
                <Videos />
              </div>
            </InfiniteScroll>
          </>
        }
      </div>
    </>
  )
}

export default Home;