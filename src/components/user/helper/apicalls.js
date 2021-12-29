import {API} from "../../Backend";

export const getUserArticlelist = (userid) => {
  return fetch(`${API}/user/artilelist/${userid}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
