import { createSlice } from "@reduxjs/toolkit";

interface LoadingInitialState{
    isLoading:boolean
}

const initialState:LoadingInitialState ={
    isLoading:true
}
export const LoadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers:{
        dataHasLoaded:(state)=> {state.isLoading=false},
        dataIsLoading:(state)=> {state.isLoading=true}
    }
})