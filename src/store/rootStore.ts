import { configureStore} from "@reduxjs/toolkit";
import { YoutubeAppSlice } from "./Slices/YoutubeAppSlice";
import { SearchSlice } from "./Slices/SearchSlice";
import { WatchSlice } from "./Slices/WatchSlice";
export type RootStoreType= ReturnType <typeof RootStore.getState>;

export const RootStore= configureStore({
    reducer:{
        youtubeApp: YoutubeAppSlice.reducer,
        search:SearchSlice.reducer,
        watch:WatchSlice.reducer
    },
});

