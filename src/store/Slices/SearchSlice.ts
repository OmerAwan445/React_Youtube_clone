import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {SearchInitialState} from "../../types"


const initialState:SearchInitialState = {
    searchTerm:''
}



export const SearchSlice = createSlice({
    name: "Search",
    initialState,
    reducers:{
    addSearchTerm:(state,action:PayloadAction<string>)=>{
        state.searchTerm =action.payload;
    },
}
}
);

export const searchActions = SearchSlice.actions;