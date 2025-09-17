export interface Post{
    userId:number;
    id:number;
    title:string;
    body:string;
}
export interface PostDb{
    _id:string;
    title:string;
    author:string;
    description:string;
}