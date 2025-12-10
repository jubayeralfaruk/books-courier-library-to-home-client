import axios from "axios";
import { useEffect } from "react";
// import { useEffect } from "react";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  // const { user } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {}, []);

  // useEffect(() => {
  //   // Add Authorization token
  //   const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
  //     if (user?.accessToken) {
  //       config.headers.Authorization = `Bearer ${user.accessToken}`;
  //     }
  //     return config;
  //   });

  //   // Handle error responses
  //   const resInterceptor = axiosSecure.interceptors.response.use(
  //     (response) => response,
  //     (error) => {
  //       console.log(error);

  //       const statusCode = error.response?.status;

  //       if (statusCode === 401 || statusCode === 403) {
  //         // signOutUser().then(() => {
  //         //   navigate("/login");
  //         // });
  //       }

  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     axiosSecure.interceptors.request.eject(reqInterceptor);
  //     axiosSecure.interceptors.response.eject(resInterceptor);
  //   };
  // }, [user]);

 
  return axiosSecure;
};

export default useAxiosSecure;
