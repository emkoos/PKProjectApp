import instance from './axiosConfig';

export const getStatuses = () => {
    return instance.get("Statuses").then((response) => response.data?.boardTypes);
};

export const getStatus = (Id: string) => {
    return instance.get(`Statuses/${Id}`).then((response) => response.data);
}