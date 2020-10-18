export interface IPostInterface {
    user_id: string;
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

export interface BasePostDocument extends IPostInterface {
    _id: string;
}
