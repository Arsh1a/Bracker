import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store";

//There is a bug with redux type so we have to use dispatch like this.
//Import this hook instead of useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
