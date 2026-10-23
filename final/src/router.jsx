import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import MainLayout from './layouts/MainLayout'
import { ProtectedRoute } from './components';

import {
  Home,
  About,
  Contact,
  Post,
  NotFound,
  AddPost,
  Category,
  Registration,
  UserPage,
} from './containers';

export const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Home />
            },
            {
              path: 'category/:catName',
              element: <Category />
            },
            {
              path: 'about', // => /about
              element: <About />,
            },
            {
              path: 'contact',
              element: <Contact />
            },
            {
              path: 'post/:id',
              element: <Post />,
            },
            {
              path: '/add-post',
              element: <AddPost />,
            },
            {
              path: '/register',
              element: <Registration />,
            },
            {
              element: <ProtectedRoute />,
              children: [
                {
                  path: 'user',
                  element: <UserPage />,
                },
              ],
            },
            {
              path: '*',
              element: <NotFound />
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
)
