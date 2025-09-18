import { appApi } from "./config";
import { GET_SEED, changePasswordApi } from "./apiPaths";

// post call
export const postApiServices = (path, value = {}) => {
  return appApi.post(`${path}`, value);
};
// update call
export const postUpdateApiServices = (path, id, value) => {
  return appApi.post(`${path}/${id}`, value);
};
//  get By id
export const getByIdApiServices = (path, id) => {
  return appApi.get(`${path}/${id}`);
};
// update call
export const updateApiServices = (path, id, value) => {
  return appApi.put(`${path}/${id}`, value);
};
export const updateWithoutIDApiServices = (path, value) => {
  return appApi.put(`${path}`, value);
};
//getseeds
export const getSeedService = (path) => {
  return appApi.get(`${GET_SEED}/${path}`);
};
//get call
export const getApiServices = (path) => {
  return appApi.get(path);
};
//changePassword
export const changePassword = (id, values) => {
  return appApi.put(`${changePasswordApi}/${id}`, values);
};
// delete api
export const deleteApiServices = (path) => {
  return appApi.delete(path);
};
//get call with payload
export const getByPayloadServices = (path, value) => {
  return appApi.get(path, value);
};
//updateById
export const updateByIdServices = (path, id) => {
  return appApi.put(`${path}/${id}`);
};
