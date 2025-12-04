import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Loading from "../components/Loading"
import Home from "../pages/Home"
import { Navigate } from 'react-router';

console.log("Protected Route")

const ProtectedRoute = () => {
    
    const context = useContext(UserContext);

    if(context.user) {
        return <Home />
    }

    if(context.loading) {
        return <Loading />
    }

    if(!context.user) {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute
