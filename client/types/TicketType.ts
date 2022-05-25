export interface TicketType {
  title: string;
  desc: string;
  status: string;
  severity: string;
  reporter: string;
  assignee: string;
  createdAt: string;
  _id: string;
  content: string;
}

export interface TicketEditableType {
  title: string;
  desc: string;
  status: string;
  severity: string;
  assignee: string;
  content: string;
}
