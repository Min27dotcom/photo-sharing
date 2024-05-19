const API_DOMAIN = "http://localhost:3006/";

export const get = async (path, options = {}) => {
  const response = await fetch(API_DOMAIN + path, options);
  const result = await response.json();
  return result;
};

export const post = async (path, options = {}) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const postWithToken = async (path, token, options = {}) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization : `Bearer ${token}`
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

export const postFile = async (path, formdata = {}, token) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "POST",
    headers: {
      Authorization : `Bearer ${token}`
    },
    body: formdata,
  });
  const result = await response.json();
  return result;
};



export const del = async (path) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "DELETE"
  });
  const result = await response.json();
  return result;
};

export const patch = async (path, options = {}) => {
  const response = await fetch(API_DOMAIN + path, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const result = await response.json();
  return result;
};

