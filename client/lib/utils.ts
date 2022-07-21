import { reset as authReset } from "../features/slices/auth/authSlice";
import { resetAllProjects } from "../features/slices/project/projectSlice";
import { resetAllInvites } from "../features/slices/invite/inviteSlice";
import { resetAllTickets } from "../features/slices/ticket/ticketSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const resetAll = (dispatch: Dispatch) => {
  dispatch(resetAllProjects());
  dispatch(resetAllTickets());
  dispatch(resetAllInvites());
};
