import { request } from 'app/axios';

export const errorParser = (error) => {
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
