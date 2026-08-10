import { Navigate, useRoutes, type Location } from 'react-router-dom';
import { AuthFilesPage } from '@/features/authFiles/AuthFilesPage';
import { AuthFilesOAuthExcludedEditPage } from '@/pages/AuthFilesOAuthExcludedEditPage';
import { AuthFilesOAuthModelAliasEditPage } from '@/pages/AuthFilesOAuthModelAliasEditPage';
import { QuotaPage } from '@/features/quota/QuotaPage';

// fox-cpa: only Auth Files + Quota are exposed; every other upstream route
// (dashboard, providers, plugins, config, logs, system) falls back to /auth-files.
const createMainRoutes = () => [
  { path: '/', element: <Navigate to="/auth-files" replace /> },
  { path: '/auth-files', element: <AuthFilesPage /> },
  { path: '/auth-files/oauth-excluded', element: <AuthFilesOAuthExcludedEditPage /> },
  { path: '/auth-files/oauth-model-alias', element: <AuthFilesOAuthModelAliasEditPage /> },
  { path: '/quota', element: <QuotaPage /> },
  { path: '*', element: <Navigate to="/auth-files" replace /> },
];

export function MainRoutes({ location }: { location?: Location }) {
  return useRoutes(createMainRoutes(), location);
}
