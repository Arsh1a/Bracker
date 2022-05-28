export interface TicketType {
  title: string;
  desc: string;
  status: string;
  severity: string;
  reporter: {
    _id: string;
    username: string;
  };
  assignee: {
    _id: string;
    username: string;
  };
  createdAt: string;
  _id: string;
  content: string;
}
