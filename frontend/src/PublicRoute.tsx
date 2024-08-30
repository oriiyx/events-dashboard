import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {getToken} from './lib/auth';

const PublicRoute: React.FC = () => {
    const token = getToken();

    // If the token is not available, redirect to the login page
    if (token) {
        return <Navigate to="/dashboard"/>;
    }

    // Otherwise, render the child components (protected routes)
    return <Outlet/>;
};

export default PublicRoute;
