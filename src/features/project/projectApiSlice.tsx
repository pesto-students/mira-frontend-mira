import { apiSlice } from 'api/apiSlice';

const mapUserRole = (role) => {
  return (item) => {
    return { ...item, role };
  };
};

const apiSliceWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['Project'] });

const transformProjectResponse = (response) => {
  const project = response.data.data;
  project.allUsers = [
    ...project.admins.map(mapUserRole('admin')),
    ...project.users.map(mapUserRole('user')),
  ];
  return project;
};

export const projectsApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => '/projects',
      providesTags: ['Project'],
    }),
    getProject: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: ['Project'],
      transformResponse: (response, meta, arg) => {
        return transformProjectResponse(response);
      },
    }),
    createProject: builder.mutation({
      query: (payload) => ({
        url: `/projects`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Project'],
      transformResponse: (response, meta, arg) => {
        return transformProjectResponse(response);
      },
    }),
    updateProject: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Project'],
      transformResponse: (response, meta, arg) => {
        return transformProjectResponse(response);
      },
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
  }),
});

export const {
  util,
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice;
