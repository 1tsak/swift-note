export type User = {
  _id: string;
  email: string;
  password: string;
};
export type Note = {
    _id:string,
    userId:string,
    title:string,
    content:string,
    createdAt:Date,
}
