// MODULE IMPORTS
import { Navigate, Outlet, } from 'react-router-dom';
import Cookies from 'universal-cookie';

const ProtectedRoute = () => {
    const cookie = new Cookies();

    const JWTToken = cookie.get("WonBillsUserToken");
    // console.log('user token is:', JWTToken, )

    return JWTToken ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute