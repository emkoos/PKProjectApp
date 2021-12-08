import instance from './axiosConfig';

export const getCommentById = (Id: string) => {
    return instance.get(`Comments/${Id}`).then((response) => response.data);
}

export const getCommentByCardId = (cardId: string) => {
    return instance.get(`Comments/Card/${cardId}`).then((response) => response.data);
}

export const getCommentByUserEmail = (email: string) => {
    return instance.get(`Comments/Card/${email}`).then((response) => response.data);
}

export const createComment = (userEmail: string, cardId: string, content: string ) => {
    const params = { userEmail, cardId, content };
    return instance.post("Comments/create", params);
}

export const editComment = (Id: string, userEmail: string, cardId: string, content: string ) => {
    const params = { Id, userEmail, cardId, content };
    return instance.put("Comments/edit", params);
}

export const deleteComment = (Id: string) => {
    return instance.delete(`Comments/${Id}`);
}