import { baseApi } from '@/servies/base-api'
import { Application, GetAppArgs, IdAppRequest } from '@/servies/types'

export const applicationsApiService = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createApplication: builder.mutation<void, Application>({
        invalidatesTags: ['AllApplications'],
        query: args => ({
          body: args,
          method: 'POST',
          url: `applications`,
        }),
      }),
      deleteApplication: builder.mutation<void, IdAppRequest>({
        invalidatesTags: ['AllApplications'],
        query: args => ({
          method: 'DELETE',
          url: `applications/${args.id}`,
        }),
      }),
      getApplications: builder.query<Application, GetAppArgs | void>({
        providesTags: ['AllApplications', 'UpdateApplication'],
        query: args => ({
          params: args ?? undefined,
          url: 'applications',
        }),
      }),
      getApplicationsById: builder.query<Application, { id: string | undefined }>({
        providesTags: ['AllApplications', 'UpdateApplication'],
        query: ({ id }) => ({
          url: `applications/${id}`,
        }),
      }),
      updateApplication: builder.mutation<Application, Application>({
        invalidatesTags: ['AllApplications', 'UpdateApplication'],
        query: args => ({
          body: args,
          method: 'PATCH',
          url: `applications/${args.id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateApplicationMutation,
  useDeleteApplicationMutation,
  useGetApplicationsByIdQuery,
  useGetApplicationsQuery,
  useUpdateApplicationMutation,
} = applicationsApiService
