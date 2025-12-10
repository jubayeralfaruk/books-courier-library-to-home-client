import React from 'react';
import useAuth from '../hooks/useAuth';
import ProfileSkeleton from '../components/skeleton_loader/ProfileSkeleton';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <ProfileSkeleton />;
    }

    if (!user) {
        return window.location.href = '/login';
    }
    return children;
};

export default PrivateRoute;