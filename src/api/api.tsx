import { request } from 'app/axios';
import { AxiosError } from 'axios';

const errorParser = (error) => {
  const { response } = error;
  return {
    status: response?.data?.status || 'failed',
    statusCode: response?.status || 500,
    message:
      response?.data?.message ||
      'Something went wrong!, please try again in sometime.',
  };
};

export const searchUsers = async (searchString = '') => {
  try {
    const searchUrl =
      '/users/search' + (searchString ? `?email[like]=${searchString}` : '');
    const response = await request.get(searchUrl);
    return response.data;
  } catch (e) {
    return errorParser(e);
  }
};

export const getProjectList = async () => {
  try {
    const response = await request.get('/projects');
    return response.data;
  } catch (e) {
    return errorParser(e);
  }
};

export const getProject = async ({ id }) => {
  try {
    const response = await request.get(`/projects/${id}`);
    return response.data;
  } catch (e) {
    return errorParser(e);
  }
};

export const createProject = async (payload) => {
  try {
    const response = await request.post(`/projects/`, payload);
    return response.data;
  } catch (e) {
    return errorParser(e);
  }
};

export const updateProject = async (id, payload) => {
  try {
    const response = await request.patch(`/projects/${id}`, payload);
    return response.data;
  } catch (e) {
    return errorParser(e);
  }
};
