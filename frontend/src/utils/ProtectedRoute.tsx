import { Navigate, Outlet } from "react-router-dom";
import useUserStore from '../../store/userStore';

const ProtectedRoute = () => {
    const user = useUserStore((state) => state.user);

    return user?.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
