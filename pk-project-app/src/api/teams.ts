import instance from './axiosConfig';

export const getUserTeams = () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Teams/teams/my`, config).then((response) => response.data?.teams);
}