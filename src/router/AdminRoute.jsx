import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import ForbiddenPage from '../pages/dashboard/Forbidden/ForbiddenAdmin';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const {role, roleLoading} = useRole();

    if (loading || roleLoading) {
        return <div className="p-4">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 mb-3 rounded-lg bg-gray-200 animate-pulse"
                />
              ))}
            </div>
    }
    if (loading || roleLoading) {
    return (
      <div className="p-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 mb-3 rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

    if (!user || role !== 'admin') {
        return <ForbiddenPage></ForbiddenPage>
    }

    return children;
};

export default AdminRoute;