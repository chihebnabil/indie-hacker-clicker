import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import './index.css'
import App from './App.tsx'

// Initialize Convex client
const convexUrl = import.meta.env.VITE_CONVEX_URL;
if (!convexUrl) {
  console.warn('VITE_CONVEX_URL not found. Auto-save will not work.');
}

const convex = new ConvexReactClient(convexUrl || 'https://tremendous-sparrow-526.convex.cloud');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </StrictMode>,
)
