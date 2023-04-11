import { apiSlice } from 'api/apiSlice';

// export const authApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     allProjects: builder.query({
//       query: () => ({
//         url: 'api/user/profile',
//         method: 'GET',
//       }),
//     }),
//   }),
// });

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '/projects',
    }),
  }),
});

export const { util, useGetProjectsQuery } = projectsApiSlice;
