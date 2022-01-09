import instance from './axiosConfig';

export const getBoardById = (Id: string) => {
    return instance.get(`Boards/${Id}`).then((response) => response.data);
}

export const getBoardByTeamId = (teamId: string) => {
    return instance.get(`Boards/Team/${teamId}`).then((response) => response.data?.boards);
}

export const createBoard = (name: string, teamId: string, boardTypeId: string) => {
    const params = { name, teamId, boardTypeId };
    return instance.post("Boards/create", params).then((response) => response.data);
}

export const editBoard = (Id: string, name: string, teamId: string, boardTypeId: string) => {
    const params = { Id, name, teamId, boardTypeId };
    return instance.put("Boards/edit", params);
}

export const deleteBoard = (Id: string) => {
    return instance.delete(`Boards/${Id}`);
}