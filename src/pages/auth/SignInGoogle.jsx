import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router";
import { FaFacebook } from "react-icons/fa";

const SignInGoogle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosSecure = UseAxiosSecure();
  const [loadGoogle, setLoadGoogle] = useState(false);
  const [loadFacebook, setLoadFacebook] = useState(false);
  const { signInGoogle, signInFacebook, loading } = useAuth();

  const handleGoogleSignIn = () => {
    setLoadGoogle(true);
    signInGoogle()
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        toast.success("Google Sign In Successful");
        navigate(from, { replace: true });
        const userInfo = {
          displayName: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
        };
        axiosSecure.post("/users", userInfo).then((data) => {
          console.log("User saved to database");
        });
        setLoadGoogle(false);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error.message);
        setLoadGoogle(false);
      });
  };

  // const handleFacebookSignIn = () => {
  //   setLoadFacebook(true);
  //   signInFacebook()
  //     .then((result) => {
  //       const loggedUser = result.user;
  //       console.log(loggedUser);
  //       toast.success("Facebook Sign In Successful");
  //       navigate(from, { replace: true });
  //       const userInfo = {
  //         displayName: loggedUser.displayName,
  //         email: loggedUser.email,
  //         photoURL: loggedUser.photoURL,
  //       };
  //       axiosSecure.post("/users", userInfo).then((data) => {
  //         console.log("User saved to database");
  //       });
  //       setLoadFacebook(false);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       toast.error("Facebook login failed. Please try another method.");
  //       setLoadFacebook(false);
  //     });
  // };

  return (
    <div className="space-y-3">
      {/* Google */}
      <button
        onClick={handleGoogleSignIn}
        disabled={loadGoogle}
        className="btn bg-white w-full text-black border-[#e5e5e5] hover:bg-gray-50">
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <g>
            <path
              d="m0 0H512V512H0"
              fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
          </g>
        </svg>
        {loadGoogle ? "Signing in..." : "Continue with Google"}
      </button>

      {/* Facebook */}
      {/* <button
        onClick={handleFacebookSignIn}
        disabled={loadFacebook}
        className="btn bg-[#1877F2] w-full text-white border-[#1877F2] hover:bg-[#166FE5] flex items-center justify-center gap-2">
        <FaFacebook size={20} />
        {loadFacebook ? "Signing in..." : "Continue with Facebook"}
      </button> */}
    </div>
  );
};

export default SignInGoogle;
