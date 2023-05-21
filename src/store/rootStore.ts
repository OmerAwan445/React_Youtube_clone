import { configureStore} from "@reduxjs/toolkit";
import { YoutubeAppSlice } from "./Slices/YoutubeAppSlice";
import { SearchSlice } from "./Slices/SearchSlice";
export type RootStoreType= ReturnType <typeof RootStore.getState>;

export const RootStore= configureStore({
    reducer:{
        youtubeApp: YoutubeAppSlice.reducer,
        search:SearchSlice.reducer
    },
});

