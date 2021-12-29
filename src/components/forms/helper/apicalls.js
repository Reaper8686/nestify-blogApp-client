import {API} from "../../Backend";

export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createArticle = (article, userId, token) => {
  return fetch(`${API}/article/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: article,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createCategory = (name, _id, token) => {
  return fetch(`${API}/category/create/${_id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(name),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const createComment = (comment, userid, token) => {
  console.log(comment);
  return fetch(`${API}/comment/create/${userid}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
