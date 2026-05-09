interface UserPayload {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

interface ISendEmailPayload {
  from?: string;
  to: string;
  subject: string;
  html: string;
}

declare namespace Express {
  export interface Request {
    currentUser: UserPayload;
  }
  export interface Response {
    currentUser: UserPayload;
  }
}
