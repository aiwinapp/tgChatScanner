import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TelegramAuth from './TelegramAuth.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<TelegramAuth />);
