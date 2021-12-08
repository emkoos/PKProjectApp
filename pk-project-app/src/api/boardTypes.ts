import instance from './axiosConfig';

export const getBoardTypes = () => {
    return instance.get("BoardTypes").then((response) => response.data?.boardTypes);
};

export const getBoardType = (Id: string) => {
    return instance.get(`BoardTypes/${Id}`).then((response) => response.data);
}