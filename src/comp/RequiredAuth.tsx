import { JSX } from 'react';
import { useAuth } from './AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { member } = useAuth();
    const location = useLocation();
    if (!member) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};
export default RequireAuth;