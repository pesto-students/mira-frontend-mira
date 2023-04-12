import { apiSlice } from 'api/apiSlice';

const apiSliceWithTag = apiSlice.enhanceEndpoints({ addTagTypes: ['Card'] });

export const cardsApiSlice = apiSliceWithTag.injectEndpoints({
  endpoints: (builder) => ({
    getCards: builder.query({
      query: ({ projectId }) => `/projects/${projectId}/cards`,
      providesTags: ['Card'],
    }),
    getCard: builder.query({
      query: ({ projectId, id }) => `/projects/${projectId}/cards/${id}`,
      providesTags: ['Card'],
      transformResponse: (response, meta, arg) => {
        return response.data.data;
      },
    }),
    createCard: builder.mutation({
      query: ({ projectId, payload }) => ({
        url: `/projects/${projectId}/cards`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Card'],
    }),
    updateCard: builder.mutation({
      query: ({ projectId, id, payload }) => ({
        url: `/projects/${projectId}/cards/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: ['Card'],
    }),
    deleteCard: builder.mutation({
      query: ({ projectId, id }) => ({
        url: `/projects/${projectId}/cards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Card'],
    }),
  }),
});

export const {
  util,
  useGetCardsQuery,
  useGetCardQuery,
  useCreateCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = cardsApiSlice;
