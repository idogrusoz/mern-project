export interface IPostInterface {
    author: PostAuthor;
    textContent: string;
    style: PostStyle;
    likes: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PostStyle {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
    backgroundColor: string;
    textAlign: string;
    color: string;
}

export interface PostAuthor {
    user_id: string;
    userName: string;
    image: string;
}

export interface BasePostDocument extends IPostInterface {
    _id: string;
}
