import { apiSlice } from 'api/apiSlice';

const apiSliceWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['User'] });

const transformSearchUserResponse = (response) => {
  return response?.data?.data || [];
};

export const userApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query({
      query: ({ searchString }) => {
        const searchUrl =
          '/users/search' +
          (searchString ? `?email[like]=${searchString}` : '');
        return searchUrl;
      },
      providesTags: ['User'],
      transformResponse: (response, meta, arg) => {
        return transformSearchUserResponse(response);
      },
    }),
  }),
});

export const { util, useSearchUsersQuery } = userApiSlice;
