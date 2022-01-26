import instance from './axiosConfig';

export const getUserTeams = () => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Teams/teams/my`, config).then((response) => response.data?.teams);
}

export const getUsersByTeamId = (teamId: string) => {
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get(`Teams/teams/users/${teamId}`, config).then((response) => response.data?.users);
}