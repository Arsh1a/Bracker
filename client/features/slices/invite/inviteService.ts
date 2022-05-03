import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth/invite/`;

//Get User Invites
const getInvites = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

//Handle Invite
const handleInvite = async (inviteData: { id: string; accepted: boolean }) => {
  const response = await axios.post(
    API_URL + inviteData.id,
    {
      accepted: inviteData.accepted,
    },
    { withCredentials: true }
  );
  return response.data;
};

const inviteService = {
  getInvites,
  handleInvite,
};

export default inviteService;
