import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../features/store";
import { reset as authReset } from "../features/slices/auth/authSlice";
import { reset as projectReset } from "../features/slices/project/projectSlice";
import { reset as inviteReset } from "../features/slices/invite/inviteSlice";
import { reset as ticketReset } from "../features/slices/ticket/ticketSlice";

//There is a bug with redux type so we have to use dispatch like this.
//Import this hook instead of useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
