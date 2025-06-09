import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { MainRoutes } from './routes/MainRoutes';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <RouterProvider router={MainRoutes} />
  </StrictMode>,
)
