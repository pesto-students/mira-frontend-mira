import { apiSlice } from 'api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/signin',
        method: 'POST',
        body: { ...credentials },
        transformResponse: (response, meta, arg) => {
          return response.data.user;
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
