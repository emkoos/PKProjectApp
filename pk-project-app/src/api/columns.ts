import instance from './axiosConfig';

export const getColumnById = (Id: string) => {
    return instance.get(`Columns/${Id}`).then((response) => response.data);
}

export const getColumnByBoardId = (boardId: string) => {
    return instance.get(`Columns/Board/${boardId}`).then((response) => response.data?.columns);
}

export const createColumn = (title: string, position: number, boardId: string) => {
    const params = { title, position, boardId };
    return instance.post("Columns/create", params);
}

export const editColumn = (Id: string, title: string, position: number, boardId: string) => {
    const params = { Id, title, position, boardId };
    return instance.put("Columns/edit", params);
}

export const deleteColumn = (Id: string) => {
    return instance.delete(`Columns/${Id}`);
}