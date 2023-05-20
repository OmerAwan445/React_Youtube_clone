import {TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootStore } from "./rootStore";

export const useAppDispatch: ()=>typeof RootStore.dispatch=useDispatch;
export const useAppSelector: TypedUseSelectorHook< ReturnType<typeof RootStore.getState>>=useSelector;