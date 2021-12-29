import {API} from "../../Backend";

export const getArticle = (articleId) => {
  return fetch(`${API}/article/${articleId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const updateArticle = (article, articleId, userId, token) => {
  return fetch(`${API}/article/update/${articleId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: article,
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const deleteArticle = (articleId, userId, token) => {
  return fetch(`${API}/article/delete/${articleId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getAllComments = (articleId) => {
  return fetch(`${API}/comments/${articleId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const mostLikedArticle = () => {
  return fetch(`${API}/articles/bylikes`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getArticlesByCategory = (categoryid) => {
  return fetch(`${API}/category/articles/${categoryid}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
