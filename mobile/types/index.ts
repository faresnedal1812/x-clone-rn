export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export interface Post {
  _id: string;
  content: string;
  image?: string;
  createdAt: string;
  user: User;
  likes: string[];
  comments: Comment[];
}

export interface Comment {
  _id: string;
  content: string;
  createdAr: string;
  user: User;
}

export interface Notification {
  _id: string;
  from: {
    username: string;
    firstName: string;
    lastName: string;
    profilePicture?: string;
  };
  to: string;
  type: "comment" | "like" | "follow";
  post: {
    _id: string;
    content: string;
    image?: string;
  };
  comment?: {
    _id: string;
    content: string;
  };
  createdAt: string;
}
