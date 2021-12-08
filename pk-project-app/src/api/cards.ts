import instance from './axiosConfig';

export const getCardById = (Id: string) => {
    return instance.get(`Cards/${Id}`).then((response) => response.data);
}

export const getCardByUserEmail = (email: string) => {
    return instance.get(`Cards/User/${email}`).then((response) => response.data);
}

export const getCardByColumnId = (columnId: string) => {
    return instance.get(`Cards/Column/${columnId}`).then((response) => response.data);
}

export const createCard = (title: string, description: string, userEmail: string, columnId: string, statusId: string, deadlineDate: string, priority: number, estimate: number, attachement: string) => {
    const params = { title, description, userEmail, columnId, statusId, deadlineDate, priority, estimate, attachement };
    return instance.post("Cards/create", params);
}

export const editCard = (Id: string, title: string, description: string, userEmail: string, columnId: string, statusId: string, deadlineDate: string, priority: number, estimate: number, attachement: string) => {
    const params = { Id, title, description, userEmail, columnId, statusId, deadlineDate, priority, estimate, attachement };
    return instance.put("Cards/edit", params);
}

export const deleteCard = (Id: string) => {
    return instance.delete(`Cards/${Id}`);
}