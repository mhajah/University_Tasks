import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home/Home.tsx'
import About from './routes/About/About.tsx'
import Projects from './routes/Projects/Projects.tsx'
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import './index.css'
import RootLayout from './layout/RootLayout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
