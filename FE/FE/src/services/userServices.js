import { get, post } from "../utils/request";

export const getUser = async (options) => {
    const result = await post(`admin/login`, options);
    return result;
};

export const getUserById = async (id) => {
    const result = await get(`user/${id}`);
    return result;
};

export const getUserByUsername = async (options) => {
    const result = await post(`user/username`, options);
    return result;
};

export const createUser = async (options) => {
    const result = await post(`user/register`, options);
    return result;
};

export const getUserList = async () => {
    const result = await get(`user/list`);
    return result;
};