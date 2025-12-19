import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import UseAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    data,
    isLoading: roleLoading,
  } = useQuery({
    queryKey: ["user-role", user?.email],
    enabled: !!user?.email && !loading, 
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/${user.email}/role`
      );
      return res.data?.role;
    },
  });
  

  return {
    role: data || "user",
    roleLoading,
  };
};

export default useRole;
