import { apiSlice } from 'api/apiSlice';

const apiSliceWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['User'] });

export const usersApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    searchUsers: builder.query({
      query: ({ searchString }) => {
        const searchUrl =
          '/users/search' +
          (searchString ? `?email[like]=${searchString}` : '');
        return searchUrl;
      },
      providesTags: ['User'],
    }),
  }),
});

export const { util, useGetSearchUsersQuery } = usersApiSlice;
