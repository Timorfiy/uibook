import { Navigate, Route, Routes } from 'react-router-dom';
import { DocsShell } from './components/DocsShell';
import { ComponentPage } from './pages/ComponentPage';
import { FoundationsPage } from './pages/FoundationsPage';
import { GettingStartedPage } from './pages/GettingStartedPage';
import { HomePage } from './pages/HomePage';
import { ThemingPage } from './pages/ThemingPage';

export default function App() {
  return (
    <Routes>
      <Route element={<DocsShell />}>
        <Route index element={<HomePage />} />
        <Route path="getting-started" element={<GettingStartedPage />} />
        <Route path="foundations" element={<FoundationsPage />} />
        <Route path="theming" element={<ThemingPage />} />
        <Route path="components/:slug" element={<ComponentPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
