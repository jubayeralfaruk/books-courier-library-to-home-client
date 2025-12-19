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
      refetch()
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
  if (isLoading) {
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

  return (
    <div
      className="p-4"
      data-aos="fade-up">
      {/* -------------------- TITLE -------------------- */}
      <h1
        data-aos="fade-down"
        className="text-3xl font-bold mb-6">
        User Management
      </h1>

      {/* -------------------- SEARCH -------------------- */}
      <input
        type="text"
        placeholder="Search user..."
        className="input text-white input-bordered w-full max-w-md mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <p>{search}</p>

      {/* -------------------- DESKTOP TABLE -------------------- */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Update Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="[&>tr>td]:bg-transparent">
            {users.map((user, idx) => (
              <tr
                className="shadow-sm"
                key={user._id}>
                <td>{idx + 1}</td>
                <td className="font-semibold">{user.displayName}</td>
                <td>{user.email}</td>

                <td>
                  <span className="badge badge-primary">
                    {user.role || "user"}
                  </span>
                </td>

                <td>
                  <select
                    className="select select-sm bg-gray-800 text-white border border-gray-300"
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
                    className="btn btn-error btn-sm"
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
        </table>
      </div>

      {/* -------------------- MOBILE VIEW -------------------- */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg p-4 shadow bg-white"
            data-aos="fade-up">
            <h2 className="font-bold text-lg">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>

            <span className="badge badge-primary mt-2">
              {user.role || "user"}
            </span>

            <div className="mt-3">
              <label className="font-semibold">Update Role</label>
              <select
                className="select w-full mt-1 bg-gray-800 text-white border border-gray-300"
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
              className="btn btn-error btn-sm w-full mt-4"
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
    </div>
  );
}
