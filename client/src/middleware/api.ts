import axios from "axios";
import { API_REQUEST } from "../actions/actionTypes";
import { REACT_APP_BASE_URL } from "../consts";

const api =
  ({ dispatch }: any) =>
  (next: any) =>
  (action: any) => {
    if (action.type !== API_REQUEST) return next(action);

    const { url, method, headers, data, onSuccess, onError } = action.payload;

    axios({
      method,
      url: `${REACT_APP_BASE_URL}${url}`,
      headers,
      data,
    })
      .then((response) => {
        onSuccess(response.data);
      })
      .catch((error) => {
        onError(error);
      });
  };

export default api;
