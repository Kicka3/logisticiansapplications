import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/app/layout/layout'
import { TableRow } from '@/common/ui/application-table'
import { ApplicationPage } from '@/common/ui/applicationPage'
import { PageNotFound } from '@/pages/pageNotFound/pageNotFound'

const router = createBrowserRouter([
  {
    children: [
      {
        element: <TableRow />,
        path: '/',
      },
      {
        element: <ApplicationPage />,
        path: '/application/:id',
      },
    ],
    element: <Layout />,
    errorElement: (
      <Layout>
        <PageNotFound />
      </Layout>
    ),
    path: '/',
  },
])

export const Router = () => {
  return <RouterProvider router={router} />
}
