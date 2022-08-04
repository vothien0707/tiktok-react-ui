import axios from 'axios';

// create instance axios
const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path, options = {}) => {
  // request.get(path, options) return 1 promise
  const response = await request.get(path, options);
  return response.data;
};

export default request;
