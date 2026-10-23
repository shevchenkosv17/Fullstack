import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AUTH_STORAGE_KEY = 'mock_jwt_auth_session';

function getStoredSession() {
  try {
    const savedSession = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!savedSession) {
      return null;
    }

    return JSON.parse(savedSession);
  } catch {
    return null;
  }
}

function ProtectedRoute() {
  const currentUser = useSelector(state => state.users.user);
  const savedSession = getStoredSession();
  const isAuthorized = Boolean(
    currentUser?.email || (savedSession?.email && savedSession?.token),
  );

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
