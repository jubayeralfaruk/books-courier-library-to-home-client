import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";

export default function UserManagement() {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  /* -------------------- AOS INIT -------------------- */
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  /* -------------------- FETCH USERS -------------------- */
  const {
    data: users = [],
    isLoading,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${search}`);
      return res.data;
    },
  });

  /* -------------------- AOS REFRESH AFTER DATA LOAD -------------------- */
  useEffect(() => {
    if (isSuccess) {
      AOS.refreshHard();
    }
  }, [isSuccess]);

  /* -------------------- UPDATE ROLE -------------------- */
  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) =>
      axiosSecure.patch(`/users/${id}`, { role }),

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        icon: "success",
        title: "Role Updated Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    },
  });

  /* -------------------- DELETE USER -------------------- */
  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/users/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        icon: "success",
        title: "User Deleted Successfully",
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    },
  });

  /* -------------------- LOADING -------------------- */
  // if (isLoading) {
  //   return (
  //     <div className="p-4">
  //       {[...Array(5)].map((_, i) => (
  //         <div
  //           key={i}
  //           className="h-16 mb-3 rounded-lg bg-gray-200 animate-pulse"
  //         />
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div
      className="p-4 bg-theme-primary min-h-screen"
      data-aos="fade-up">
      {/* -------------------- TITLE -------------------- */}
      <h1
        data-aos="fade-down"
        className="text-3xl font-bold mb-6 text-theme-primary">
        User Management
      </h1>

      {/* -------------------- SEARCH -------------------- */}
      <input
        type="text"
        placeholder="Search user..."
        className="w-full max-w-md mb-4 px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* -------------------- DESKTOP TABLE -------------------- */}
      <div className="overflow-x-auto hidden md:block rounded-xl shadow-lg">
        <table className="table w-full bg-surface">
          <thead className="bg-theme-secondary">
            <tr className="text-theme-primary">
              <th className="font-semibold">#</th>
              <th className="font-semibold">Name</th>
              <th className="font-semibold">Email</th>
              <th className="font-semibold">Role</th>
              <th className="font-semibold">Update Role</th>
              <th className="font-semibold">Action</th>
            </tr>
          </thead>

          {isLoading ? (
            <tbody>
              <td colSpan={6}>
                <div className="p-4">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 mb-3 rounded-lg bg-theme-secondary animate-pulse"
                    />
                  ))}
                </div>
              </td>
            </tbody>
          ) : (
            <tbody>
              {users.map((user, idx) => (
                <tr
                  className="hover:bg-theme-secondary text-theme-primary"
                  key={user._id}>
                  <td className="text-theme-primary">{idx + 1}</td>
                  <td className="font-semibold text-theme-primary">{user.displayName}</td>
                  <td className="text-theme-secondary">{user.email}</td>

                  <td>
                    <span className="badge text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                      {user.role || "user"}
                    </span>
                  </td>

                  <td>
                    <select
                      className="px-3 py-2 bg-theme-secondary border border-theme rounded text-theme-primary focus:outline-none focus:border-[var(--color-primary)]"
                      defaultValue={user.role || "user"}
                      onChange={(e) =>
                        Swal.fire({
                          title: "Change Role?",
                          text: "Are you sure you want to update this user's role?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, update",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            updateRoleMutation.mutate({
                              id: user._id,
                              role: e.target.value,
                            });
                          }
                        })
                      }>
                      <option value="user">User</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm text-white"
                      style={{ backgroundColor: 'var(--color-error)' }}
                      onClick={() =>
                        Swal.fire({
                          title: "Are you sure?",
                          text: "User will be permanently removed!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Delete",
                        }).then((res) => {
                          if (res.isConfirmed) {
                            deleteMutation.mutate(user._id);
                          }
                        })
                      }>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* -------------------- MOBILE VIEW -------------------- */}
      {isLoading && (
        <div className="md:hidden text-center py-20">
          <span className="loading loading-spinner loading-lg" style={{ color: 'var(--color-primary)' }}></span>
        </div>
      )}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="border border-theme rounded-lg p-4 shadow-lg bg-surface"
            data-aos="fade-up">
            <h2 className="font-bold text-lg text-theme-primary">{user.name}</h2>
            <p className="text-theme-secondary">{user.email}</p>

            <span className="badge text-white mt-2" style={{ backgroundColor: 'var(--color-primary)' }}>
              {user.role || "user"}
            </span>

            <div className="mt-3">
              <label className="font-semibold text-theme-primary">Update Role</label>
              <select
                className="w-full mt-1 px-3 py-2 bg-theme-secondary border border-theme rounded text-theme-primary focus:outline-none focus:border-[var(--color-primary)]"
                defaultValue={user.role || "user"}
                onChange={(e) =>
                  Swal.fire({
                    title: "Change Role?",
                    text: "Are you sure you want to update this user's role?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, update",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      updateRoleMutation.mutate({
                        id: user._id,
                        role: e.target.value,
                      });
                    }
                  })
                }>
                <option value="user">User</option>
                <option value="seller">Seller</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              className="btn btn-sm w-full mt-4 text-white"
              style={{ backgroundColor: 'var(--color-error)' }}
              onClick={() =>
                Swal.fire({
                  title: "Are you sure?",
                  text: "User will be permanently removed!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Delete",
                }).then((res) => {
                  if (res.isConfirmed) {
                    deleteMutation.mutate(user._id);
                  }
                })
              }>
              Delete User
            </button>
          </div>
        ))}

      </div>
        {
          users.length === 0 && !isLoading && (
            <div className="">
              <h2 className="text-xl text-theme-secondary mt-10 text-center">User Not Found</h2>
            </div>
          )
        }
    </div>
  );
}
