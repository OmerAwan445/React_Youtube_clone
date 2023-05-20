import { configureStore} from "@reduxjs/toolkit";
import { HomePageSlice } from "./Slices/HomePageSlice";





export type RootStoreType= ReturnType <typeof RootStore.getState>;


export const RootStore= configureStore({
    reducer:{
       homePage: HomePageSlice.reducer},
});

