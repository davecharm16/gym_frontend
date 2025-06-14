import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { CssBaseline } from '@mui/material';
import { RouterProvider } from 'react-router-dom';
import { MainRoutes } from './routes/MainRoutes';
import { lightTheme } from './theme/theme';
import { ThemeProvider } from '@mui/material/styles';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <RouterProvider router={MainRoutes} />
    </ThemeProvider>
  </StrictMode>,
)
