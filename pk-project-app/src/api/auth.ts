import instance from './axiosConfig';

export const loginUser = (email: string, password: string) => {
    const params = { email, password };
    return instance.post("Users/login", params).then((response) => response.data);
}

export const infoUser = () => {
    const config = {
         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }
    return instance.get("Users/user/logged-in-user", config).then((response) => response.data);
}