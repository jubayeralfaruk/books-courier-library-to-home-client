import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import AOS from "aos";
import "aos/dist/aos.css";
import { auth } from "../firebase/firebase.init";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
    const {user} = useAuth();
    console.log(user);
    

    const [name, setName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        AOS.init({ duration: 900 });
    }, []);

    const handleUpdate = async () => {
        setLoading(true);

        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL,
            });

            setEditMode(false);
        } catch (error) {
            console.log("Error updating profile:", error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 p-6">

            <div
                className="w-full max-w-md bg-gray-900/70 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-xl"
                data-aos="fade-up"
            >
                <h2 className="text-3xl font-bold text-white text-center mb-6">
                    My Profile
                </h2>

                {/* User Avatar */}
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={
                            user?.photoURL ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-gray-700 shadow-lg object-cover"
                    />

                    {!editMode ? (
                        <p className="text-gray-400 mt-3">{user?.email}</p>
                    ) : (
                        ""
                    )}
                </div>

                {/* Name */}
                <div className="mb-4">
                    <label className="text-gray-300 text-sm">Full Name</label>
                    <input
                        disabled={!editMode}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-4 py-3 mt-1 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 outline-none ${
                            editMode ? "focus:border-blue-500" : "opacity-70"
                        } transition`}
                    />
                </div>

                {/* Photo URL */}
                <div className="mb-4">
                    <label className="text-gray-300 text-sm">Photo URL</label>
                    <input
                        disabled={!editMode}
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className={`w-full px-4 py-3 mt-1 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 outline-none ${
                            editMode ? "focus:border-blue-500" : "opacity-70"
                        } transition`}
                    />
                </div>

                {/* Email (read-only) */}
                <div className="mb-6">
                    <label className="text-gray-300 text-sm">Email</label>
                    <input
                        value={user?.email}
                        disabled
                        className="w-full px-4 py-3 mt-1 bg-gray-800 border border-gray-700 rounded-lg text-gray-500 cursor-not-allowed"
                    />
                </div>

                {/* Buttons */}
                {!editMode ? (
                    <button
                        onClick={() => setEditMode(true)}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg font-semibold shadow-lg"
                    >
                        Edit Profile
                    </button>
                ) : (
                    <div className="flex gap-4">
                        <button
                            onClick={() => setEditMode(false)}
                            className="w-1/2 py-3 bg-gray-700 hover:bg-gray-800 transition text-white rounded-lg font-semibold"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="w-1/2 py-3 bg-green-600 hover:bg-green-700 transition text-white rounded-lg font-semibold"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default MyProfile;
