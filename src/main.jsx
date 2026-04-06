import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes  from "./pages/Routes.jsx"
import { GlobalStyle } from './DocelCore';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <span style={GlobalStyle}>
      <AppRoutes/>
    </span>
  </StrictMode>,
)
