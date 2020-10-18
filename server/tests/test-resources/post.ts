import { BasePostDocument, IPostInterface } from "../../interfaces/post.interfaces";

export const mockPost1: IPostInterface = {
    user_id: "userId",
    textContent: "myPost1",
    style: {
        backgroundColor: "bgcolor",
        color: "color",
        fontFamily: "fontfamily",
        fontSize: 1,
        fontWeight: 1,
        textAlign: "center",
    },
    likes: ["userId2"],
};

export const mockPostWithId1: BasePostDocument = {
    ...mockPost1,
    _id: "postId1",
};

export const mockPost2: IPostInterface = {
    user_id: "userId",
    textContent: "myPost2",
    style: {
        backgroundColor: "bgcolor",
        color: "color",
        fontFamily: "fontfamily",
        fontSize: 1,
        fontWeight: 1,
        textAlign: "center",
    },
    likes: ["userId2"],
};

export const mockPostWithId2: BasePostDocument = {
    ...mockPost2,
    _id: "postId2",
};

export const mockPost3: IPostInterface = {
    user_id: "userId",
    textContent: "myPost3",
    style: {
        backgroundColor: "bgcolor",
        color: "color",
        fontFamily: "fontfamily",
        fontSize: 1,
        fontWeight: 1,
        textAlign: "center",
    },
    likes: ["userId2"],
};

export const mockPostWithId3: BasePostDocument = {
    ...mockPost3,
    _id: "postId3",
};

export const mockPost4: IPostInterface = {
    user_id: "userId2",
    textContent: "myPost4",
    style: {
        backgroundColor: "bgcolor",
        color: "color",
        fontFamily: "fontfamily",
        fontSize: 1,
        fontWeight: 1,
        textAlign: "center",
    },
    likes: ["userId"],
};

export const mockPostWithId4: BasePostDocument = {
    ...mockPost4,
    _id: "postId4",
};

export const mockPost5: IPostInterface = {
    user_id: "userId2",
    textContent: "myPost5",
    style: {
        backgroundColor: "bgcolor",
        color: "color",
        fontFamily: "fontfamily",
        fontSize: 1,
        fontWeight: 1,
        textAlign: "center",
    },
    likes: ["userId"],
};

export const mockPostWithId5: BasePostDocument = {
    ...mockPost5,
    _id: "postId5",
};

export const mockUpdatePost5: IPostInterface = {
    user_id: "userId2",
    textContent: "myUpdatedPost5",
    style: {
        backgroundColor: "bgcolor",
        color: "color",
        fontFamily: "fontfamily",
        fontSize: 1,
        fontWeight: 1,
        textAlign: "center",
    },
    likes: ["userId", "userId3"],
};

export const postsArray = [mockPost2, mockPost3, mockPost4, mockPost5];
