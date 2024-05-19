import { del, get, postFile, postWithToken } from "../utils/request";

export const getPhotoOfUser = async (id) => {
    const result = await get(`/${id}`);
    return result;
};

export const addComment = async (id, token, options) => {
    const result = await postWithToken(`photo/comment/${id}`, token, options);
    return result;
};

export const getCommentOfPhoto = async (id) => {
    const result = await get(`photo/comment/${id}`);
    return result;
};


// export const uploadPhoto = async (token, options) => {
//     const result = await postWithToken('photo/upload', token, options);
//     return result;
// }
export const uploadPhoto = async (formdata, token) => {
    const result = await postFile('photo/upload', formdata, token);
    return result;
}

export const deletePhoto = async (photoId) => {
    const result = await del(`photo/${photoId}`);
    return result;
} 

