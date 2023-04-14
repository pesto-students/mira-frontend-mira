import { apiSlice } from 'api/apiSlice';

const apiSliceWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['User'] });

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
        return response?.data?.data || [];
      },
    }),
    getProfile: builder.query({
      query: () => `/users/me`,
      transformResponse: (response, meta, arg) => {
        return response.data.data;
      },
      providesTags: ['User'],
    }),
    createProfile: builder.mutation({
      query: ({ data }) => ({
        url: 'auth/signup',
        method: 'POST',
        providesTags: ['User'],
        body: { ...data },
      }),
      transformResponse: (response, meta, arg) => {
        return response.data.data;
      },
      invalidatesTags: ['User'],
    }),
    updateProfile: builder.mutation({
      query: ({ data }) => ({
        url: 'users/updateMe',
        method: 'PATCH',
        providesTags: ['User'],
        body: { ...data },
      }),
      transformResponse: (response, meta, arg) => {
        return response.data.data;
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useSearchUsersQuery,
  useGetProfileQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
} = userApiSlice;
